# Styled Console Log

一个强大的 VSCode 扩展，帮助你快速生成带样式的 console.log 语句，让你的调试输出更加美观和易于识别。

## ✨ 功能特性

- 🎨 **带样式的日志输出** - 使用 CSS 样式美化你的 console.log
- ⚡ **快速插入** - 选中变量后一键插入日志语句
- 🎯 **智能定位** - 插入后自动定位到日志行
- 🛠️ **自定义样式** - 支持完全自定义 CSS 样式
- 🗑️ **批量清理** - 一键删除所有 console.log 语句
- ⚙️ **配置灵活** - 支持全局样式配置

## 🚀 快速开始

### 安装扩展

1. 打开 VSCode
2. 按 `Ctrl+Shift+X` 打开扩展面板
3. 搜索 "Styled Console Log"
4. 点击安装

### 基本使用

1. **选中变量** - 在代码中选中你要调试的变量
2. **使用快捷键**：
   - `Ctrl+Alt+L` (Mac: `Cmd+Alt+L`) - 插入带样式的日志
   - `Ctrl+Alt+K` (Mac: `Cmd+Alt+K`) - 插入自定义样式的日志
   - `Ctrl+Alt+D` (Mac: `Cmd+Alt+D`) - 删除所有日志

## 📖 详细功能

### 1. 插入带样式的日志

选中变量后按 `Ctrl+Alt+L`，会在下一行插入：

```javascript
console.log('%c变量名', 'background-color:#1e80ff;color:#fff;padding:3px 5px;border-radius:5px', 变量名);
```

输出效果：带有蓝色背景和白色文字的美观日志

### 2. 插入自定义样式的日志

选中变量后按 `Ctrl+Alt+K`，会弹出输入框让你自定义 CSS 样式：

```javascript
console.log('%c变量名', 'color: red; font-size: 20px; font-weight: bold;', 变量名);
```

### 3. 删除所有日志

按 `Ctrl+Alt+D` 可以一键删除当前文件中的所有 console.log 语句，方便清理调试代码。

## ⚙️ 配置选项

在 VSCode 设置中搜索 "Styled Console Log" 可以配置默认样式：

| 配置项 | 描述 | 默认值 |
|--------|------|--------|
| `styledConsoleLog.style.backgroundColor` | 日志背景颜色 | `#1e80ff` |
| `styledConsoleLog.style.color` | 日志文字颜色 | `#ffffff` |
| `styledConsoleLog.style.padding` | 日志内边距 | `3px 5px` |
| `styledConsoleLog.style.borderRadius` | 日志边框圆角 | `5px` |

### 配置示例

```json
{
    "styledConsoleLog.style.backgroundColor": "#ff4d4f",
    "styledConsoleLog.style.color": "#ffffff",
    "styledConsoleLog.style.padding": "5px 10px",
    "styledConsoleLog.style.borderRadius": "8px"
}
```

## 🎯 使用场景

### 调试不同类型的数据

```javascript
// API 请求调试
console.log('%cAPI Response', 'background-color:#52c41a;color:#fff;padding:3px 5px;border-radius:5px', response);

// 错误调试
console.log('%cError Info', 'background-color:#ff4d4f;color:#fff;padding:3px 5px;border-radius:5px', error);

// 状态调试
console.log('%cState Update', 'background-color:#722ed1;color:#fff;padding:3px 5px;border-radius:5px', newState);
```

### 区分不同模块的日志

```javascript
// 用户模块
console.log('%cUser Module', 'background-color:#1890ff;color:#fff;padding:3px 5px;border-radius:5px', userData);

// 订单模块
console.log('%cOrder Module', 'background-color:#fa8c16;color:#fff;padding:3px 5px;border-radius:5px', orderData);
```

## 🎨 样式预设

扩展内置了几种常用的样式预设：

- **蓝色主题**：`background-color:#1e80ff;padding:3px 5px;color:#fff;border-radius:5px`
- **红色主题**：`background-color:#ff4d4f;padding:3px 5px;color:#fff;border-radius:5px`
- **绿色主题**：`background-color:#52c41a;padding:3px 5px;color:#fff;border-radius:5px`

## 📝 使用技巧

1. **智能缩进**：扩展会自动检测当前代码的缩进级别
2. **参数识别**：如果选中的是函数参数，会自动增加缩进
3. **光标定位**：插入日志后自动定位到日志行，方便继续编辑
4. **批量操作**：使用右键菜单也可以访问所有功能

## 🔧 故障排除

### 快捷键不工作？

1. 检查是否有其他扩展占用了相同快捷键
2. 在 VSCode 设置中搜索 "keyboard shortcuts" 重新设置

### 样式不生效？

1. 确保在支持 CSS 样式的环境中运行（如浏览器开发者工具）
2. 检查 CSS 语法是否正确

## 📞 支持与反馈

如果遇到问题或有改进建议，欢迎：

- 在 GitHub 上提交 Issue
- 通过 VSCode 扩展评论区反馈
- 为扩展评分和评论

## 📄 许可证

MIT License

---

**享受更高效的调试体验！** 🎉