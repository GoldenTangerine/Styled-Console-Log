# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述
这是一个 VSCode 扩展项目，名为 "Styled Console Log"，用于快速生成带样式的 console.log 语句。

## 开发命令

### 编译和构建
```bash
# 编译 TypeScript 代码
npm run compile

# 监听模式编译
npm run watch

# 发布前编译
npm run vscode:prepublish

# 打包扩展
npm run package
```

## 项目架构

### 核心文件结构
- `src/extension.ts` - 主要扩展代码，包含所有命令实现
- `package.json` - 扩展配置和命令定义
- `tsconfig.json` - TypeScript 配置
- `out/` - 编译输出目录

### 扩展功能
1. **插入带样式的 Console Log** - 使用预设样式
2. **插入自定义样式的 Console Log** - 用户自定义 CSS 样式
3. **删除所有 Console Log** - 批量清理调试日志

### 命令和快捷键
- `Ctrl+Alt+L` (Mac: `Cmd+Alt+L`) - 插入带样式的日志
- `Ctrl+Alt+K` (Mac: `Cmd+Alt+K`) - 插入自定义样式的日志
- `Ctrl+Alt+D` (Mac: `Cmd+Alt+D`) - 删除所有日志

### 配置项
扩展支持以下配置 (在 `package.json` 中定义):
- `styledConsoleLog.style.backgroundColor` - 日志背景颜色
- `styledConsoleLog.style.color` - 日志文字颜色
- `styledConsoleLog.style.padding` - 日志内边距
- `styledConsoleLog.style.borderRadius` - 日志边框圆角

## 代码风格
- 所有函数和接口都使用 JSDoc 注释
- 作者信息统一为 `@author sm`
- 使用中文注释说明代码功能
- 遵循 TypeScript 严格模式配置

## 测试和调试
- 使用 F5 在 VSCode 中调试扩展
- 在新窗口中测试扩展功能
- 编译输出到 `out/` 目录，包含 source map 用于调试