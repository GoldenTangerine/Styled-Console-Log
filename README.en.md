# Styled Console Log

[简体中文](README.md) | **English**

A powerful VSCode extension that helps you quickly generate styled console.log statements, making your debug output more beautiful and easier to identify.

## ✨ Features

- 🎨 **Styled Log Output** - Beautify your console.log with CSS styles
- ⚡ **Quick Insert** - One-click insert log statements after selecting variables
- 🎯 **Smart Positioning** - Automatically navigate to the log line after insertion
- 🛠️ **Custom Styles** - Support fully customizable CSS styles
- 🗑️ **Batch Cleanup** - Delete all console.log statements with one click
- ⚙️ **Flexible Configuration** - Support global style configuration

## 🚀 Quick Start

### Install Extension

1. Open VSCode
2. Press `Ctrl+Shift+X` to open the Extensions panel
3. Search for "Styled Console Log"
4. Click Install

### Basic Usage

1. **Select Variable** - Select the variable you want to debug in your code
2. **Use Shortcuts**:
   - `Ctrl+Alt+L` (Mac: `Cmd+Alt+L`) - Insert styled log
   - `Ctrl+Alt+K` (Mac: `Cmd+Alt+K`) - Insert custom styled log
   - `Ctrl+Alt+D` (Mac: `Cmd+Alt+D`) - Delete all logs

## 📖 Detailed Features

### 1. Insert Styled Log

After selecting a variable, press `Ctrl+Alt+L` to insert on the next line:

```javascript
console.log('%cvariableName', 'background-color:#1e80ff;color:#fff;padding:3px 5px;border-radius:5px', variableName);
```

Output effect: Beautiful log with blue background and white text

### 2. Insert Custom Styled Log

After selecting a variable, press `Ctrl+Alt+K` to open an input box for custom CSS styles:

```javascript
console.log('%cvariableName', 'color: red; font-size: 20px; font-weight: bold;', variableName);
```

### 3. Delete All Logs

Press `Ctrl+Alt+D` to delete all console.log statements in the current file with one click, convenient for cleaning up debug code.

## ⚙️ Configuration Options

Search for "Styled Console Log" in VSCode settings to configure default styles:

| Configuration | Description | Default Value |
|---------------|-------------|---------------|
| `styledConsoleLog.style.backgroundColor` | Log background color | `#1e80ff` |
| `styledConsoleLog.style.color` | Log text color | `#ffffff` |
| `styledConsoleLog.style.padding` | Log padding | `3px 5px` |
| `styledConsoleLog.style.borderRadius` | Log border radius | `5px` |

### Configuration Example

```json
{
    "styledConsoleLog.style.backgroundColor": "#ff4d4f",
    "styledConsoleLog.style.color": "#ffffff",
    "styledConsoleLog.style.padding": "5px 10px",
    "styledConsoleLog.style.borderRadius": "8px"
}
```

## 🎯 Use Cases

### Debug Different Types of Data

```javascript
// API request debugging
console.log('%cAPI Response', 'background-color:#52c41a;color:#fff;padding:3px 5px;border-radius:5px', response);

// Error debugging
console.log('%cError Info', 'background-color:#ff4d4f;color:#fff;padding:3px 5px;border-radius:5px', error);

// State debugging
console.log('%cState Update', 'background-color:#722ed1;color:#fff;padding:3px 5px;border-radius:5px', newState);
```

### Distinguish Logs from Different Modules

```javascript
// User module
console.log('%cUser Module', 'background-color:#1890ff;color:#fff;padding:3px 5px;border-radius:5px', userData);

// Order module
console.log('%cOrder Module', 'background-color:#fa8c16;color:#fff;padding:3px 5px;border-radius:5px', orderData);
```

## 🎨 Style Presets

The extension includes several commonly used style presets:

- **Blue Theme**: `background-color:#1e80ff;padding:3px 5px;color:#fff;border-radius:5px`
- **Red Theme**: `background-color:#ff4d4f;padding:3px 5px;color:#fff;border-radius:5px`
- **Green Theme**: `background-color:#52c41a;padding:3px 5px;color:#fff;border-radius:5px`

## 📝 Usage Tips

1. **Smart Indentation**: Extension automatically detects current code indentation level
2. **Parameter Recognition**: Automatically increases indentation if selected text is a function parameter
3. **Cursor Positioning**: Automatically navigates to the log line after insertion for easy editing
4. **Batch Operations**: All features are also accessible through the right-click context menu

## 🔧 Troubleshooting

### Shortcuts Not Working?

1. Check if other extensions are using the same shortcuts
2. Reset shortcuts in VSCode settings by searching "keyboard shortcuts"

### Styles Not Taking Effect?

1. Ensure running in an environment that supports CSS styles (like browser developer tools)
2. Check if CSS syntax is correct

## 📞 Support & Feedback

If you encounter issues or have improvement suggestions, feel free to:

- Submit Issues on GitHub
- Provide feedback through VSCode extension comments
- Rate and review the extension

---

**Enjoy a more efficient debugging experience!** 🎉