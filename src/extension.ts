import * as vscode from 'vscode';

/**
 * @author sm
 * @description 定义日志样式模板
 */
interface LogStyle {
    name: string;
    style: string;
}

const DEFAULT_STYLES: LogStyle[] = [
    {
        name: '蓝色',
        style: 'background-color:#1e80ff;padding:3px 5px;color:#fff;border-radius:5px'
    },
    {
        name: '红色',
        style: 'background-color:#ff4d4f;padding:3px 5px;color:#fff;border-radius:5px'
    },
    {
        name: '绿色',
        style: 'background-color:#52c41a;padding:3px 5px;color:#fff;border-radius:5px'
    }
];

/**
 * @author sm
 * @description 获取当前行的缩进
 * @param {vscode.TextDocument} document 文档对象
 * @param {number} lineNumber 行号
 * @returns {string} 缩进字符串
 */
function getIndentation(document: vscode.TextDocument, lineNumber: number): string {
    const line = document.lineAt(lineNumber);
    const match = line.text.match(/^\s*/);
    return match ? match[0] : '';
}

/**
 * @author sm
 * @description 检查行尾是否有其他代码
 * @param {vscode.TextDocument} document 文档对象
 * @param {vscode.Position} position 位置
 * @returns {boolean} 是否有其他代码
 */
function hasCodeAfter(document: vscode.TextDocument, position: vscode.Position): boolean {
    const line = document.lineAt(position.line);
    const textAfter = line.text.substring(position.character).trim();
    return textAfter.length > 0;
}

/**
 * @author sm
 * @description 删除所有 console.log 语句
 * @param {vscode.TextEditor} editor 编辑器实例
 */
async function removeAllConsoleLogs(editor: vscode.TextEditor) {
    // 获取文档的所有内容
    const document = editor.document;
    const text = document.getText();
    
    // 使用正则表达式匹配 console.log 语句
    const consoleLogRegex = /^.*console\.log\(.*\);?\s*$/gm;
    
    // 获取所有匹配的行
    const matches = [...text.matchAll(consoleLogRegex)];
    
    if (matches.length === 0) {
        vscode.window.showInformationMessage('没有找到 console.log 语句');
        return;
    }

    // 创建工作空间编辑
    const workspaceEdit = new vscode.WorkspaceEdit();
    
    // 从后往前删除，以避免位置偏移问题
    for (let i = matches.length - 1; i >= 0; i--) {
        const match = matches[i];
        const startPos = document.positionAt(match.index!);
        const endPos = document.positionAt(match.index! + match[0].length);
        const range = new vscode.Range(startPos, endPos);
        
        workspaceEdit.delete(document.uri, range);
    }
    
    // 应用编辑
    await vscode.workspace.applyEdit(workspaceEdit);
    
    // 显示删除数量
    vscode.window.showInformationMessage(`已删除 ${matches.length} 条 console.log 语句`);
}

/**
 * @author sm
 * @description 判断选中内容是否是方法的参数
 * @param {vscode.TextDocument} document 文档对象
 * @param {vscode.Selection} selection 选中区域
 * @returns {boolean} 是否是方法参数
 */
function isMethodParameter(document: vscode.TextDocument, selection: vscode.Selection): boolean {
    const line = document.lineAt(selection.start.line);
    const lineText = line.text;
    const beforeSelection = lineText.substring(0, selection.start.character).trim();
    // 检查选中内容之前是否有左括号或逗号，说明是参数
    return /[,(]\s*$/.test(beforeSelection);
}

/**
 * @author sm
 * @description 获取适当的缩进
 * @param {vscode.TextDocument} document 文档对象
 * @param {vscode.Selection} selection 选中区域
 * @returns {string} 缩进字符串
 */
function getAppropriateIndentation(document: vscode.TextDocument, selection: vscode.Selection): string {
    const baseIndentation = getIndentation(document, selection.end.line);
    const isParameter = isMethodParameter(document, selection);
    // 如果是参数，增加一个缩进级别
    return isParameter ? baseIndentation + '    ' : baseIndentation;
}

/**
 * @author sm
 * @description 获取配置的样式
 * @returns {string} CSS 样式字符串
 */
function getConfiguredStyle(): string {
    const config = vscode.workspace.getConfiguration('styledConsoleLog.style');
    const backgroundColor = config.get<string>('backgroundColor');
    const color = config.get<string>('color');
    const padding = config.get<string>('padding');
    const borderRadius = config.get<string>('borderRadius');

    return `background-color:${backgroundColor};color:${color};padding:${padding};border-radius:${borderRadius}`;
}

/**
 * @author sm
 * @description 插件激活入口函数
 * @param {vscode.ExtensionContext} context 插件上下文
 */
export function activate(context: vscode.ExtensionContext) {
    // 注册命令：插入带样式的日志
    let insertStyledLog = vscode.commands.registerCommand('styled-console-log.insertStyledLog', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);
        const indentation = getAppropriateIndentation(editor.document, selection);
        
        // 使用配置的样式
        const style = getConfiguredStyle();
        const logStatement = `${indentation}console.log('%c${text}', '${style}', ${text});`;
        const insertPosition = new vscode.Position(selection.end.line + 1, 0);

        editor.edit(editBuilder => {
            editBuilder.insert(insertPosition, logStatement + '\n');
        }).then(() => {
            // 插入完成后，将光标移动到插入的console.log行的开头
            const newPosition = new vscode.Position(insertPosition.line, indentation.length);
            editor.selection = new vscode.Selection(newPosition, newPosition);
            // 滚动到光标位置
            editor.revealRange(new vscode.Range(newPosition, newPosition));
        });
    });

    // 注册命令：插入自定义样式的日志
    let insertCustomStyledLog = vscode.commands.registerCommand('styled-console-log.insertCustomStyledLog', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        // 使用配置的样式作为默认值
        const defaultStyle = getConfiguredStyle();
        const style = await vscode.window.showInputBox({
            placeHolder: "输入 CSS 样式，例如: color: red; font-size: 20px;",
            value: defaultStyle
        });

        if (!style) {
            return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);
        const indentation = getAppropriateIndentation(editor.document, selection);
        
        const logStatement = `${indentation}console.log('%c${text}', '${style}', ${text});`;
        const insertPosition = new vscode.Position(selection.end.line + 1, 0);

        editor.edit(editBuilder => {
            editBuilder.insert(insertPosition, logStatement + '\n');
        }).then(() => {
            // 插入完成后，将光标移动到插入的console.log行的开头
            const newPosition = new vscode.Position(insertPosition.line, indentation.length);
            editor.selection = new vscode.Selection(newPosition, newPosition);
            // 滚动到光标位置
            editor.revealRange(new vscode.Range(newPosition, newPosition));
        });
    });

    // 注册命令：删除所有日志
    let removeAllLogs = vscode.commands.registerCommand('styled-console-log.removeAllLogs', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        const text = document.getText();
        
        // 使用正则表达式匹配并删除所有 console.log
        const newText = text.replace(/console\.log\(.*\);?\n?/g, '');
        
        editor.edit(editBuilder => {
            const firstLine = document.lineAt(0);
            const lastLine = document.lineAt(document.lineCount - 1);
            const textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
            editBuilder.replace(textRange, newText);
        });
    });

    context.subscriptions.push(insertStyledLog, insertCustomStyledLog, removeAllLogs);
}

/**
 * @description 插件停用时触发
 */
export function deactivate() {} 