# GitHub Actions 自动发布设置指南

本文档介绍如何设置 GitHub Actions 来自动打包和发布你的 VSCode 扩展。

## 🚀 快速设置

### 1. 创建 GitHub 仓库

1. 在 GitHub 上创建一个新仓库
2. 将本地代码推送到 GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/GoldenTangerine/Styled-Console-Log.git
git push -u origin main
```

### 2. 更新仓库信息

在 `package.json` 中更新以下字段为你的实际仓库地址：

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/GoldenTangerine/Styled-Console-Log.git"
  },
  "bugs": {
    "url": "https://github.com/GoldenTangerine/Styled-Console-Log/issues"
  },
  "homepage": "https://github.com/GoldenTangerine/Styled-Console-Log#readme"
}
```

### 3. 设置 Secrets（可选）

如果要发布到 VSCode 扩展市场，需要在 GitHub 仓库设置中添加以下 Secrets：

#### 获取 VSCode 扩展市场 Token：
1. 访问 [Azure DevOps](https://dev.azure.com/)
2. 创建 Personal Access Token
3. 在 GitHub 仓库的 Settings > Secrets 中添加 `VSCE_PAT`

#### 获取 Open VSX Registry Token：
1. 访问 [Open VSX Registry](https://open-vsx.org/)
2. 注册账号并创建 Access Token
3. 在 GitHub 仓库的 Settings > Secrets 中添加 `OVSX_PAT`

## 🔄 工作流说明

### CI 工作流 (`.github/workflows/ci.yml`)

**触发条件：**
- 推送到 main/master 分支
- 创建 Pull Request

**功能：**
- 多 Node.js 版本测试 (16, 18, 20)
- TypeScript 编译检查
- 扩展打包测试
- 上传构建产物

### Release 工作流 (`.github/workflows/release.yml`)

**触发条件：**
- 推送版本标签 (如 `v1.0.0`)

**功能：**
- 编译和打包扩展
- 创建 GitHub Release
- 上传 `.vsix` 文件到 Release
- 发布到 VSCode 扩展市场 (可选)
- 发布到 Open VSX Registry (可选)

## 📦 发布新版本

### 方法 1：使用 Git 标签

```bash
# 更新版本号
npm version patch  # 或 minor, major

# 推送代码和标签
git push origin main --tags
```

### 方法 2：手动创建标签

```bash
# 手动修改 package.json 中的版本号
# 然后创建标签
git tag v1.0.1
git push origin v1.0.1
```

## 🎯 自动化流程

1. **代码提交** → CI 工作流自动运行测试
2. **创建标签** → Release 工作流自动发布
3. **GitHub Release** → 自动创建并附加 `.vsix` 文件
4. **扩展市场** → 自动发布到 VSCode 市场 (如果配置了 Token)

## 📋 版本管理最佳实践

### 语义化版本

- **patch** (`1.0.1`): Bug 修复
- **minor** (`1.1.0`): 新功能，向下兼容
- **major** (`2.0.0`): 破坏性变更

### 发布前检查清单

- [ ] 更新 `CHANGELOG.md`
- [ ] 测试所有功能正常
- [ ] 检查版本号是否正确
- [ ] 确保所有测试通过
- [ ] 代码已推送到主分支

## 🛠️ 故障排除

### 常见问题

1. **工作流失败**
   - 检查 Node.js 版本兼容性
   - 确保所有依赖都在 `package.json` 中

2. **发布失败**
   - 检查 GitHub Token 权限
   - 确保版本号格式正确 (`v1.0.0`)

3. **扩展市场发布失败**
   - 检查 `VSCE_PAT` Secret 是否正确设置
   - 确保 `publisher` 字段与账号匹配

### 调试工具

```bash
# 本地测试打包
npm run package

# 检查工作流语法
# 在 GitHub 仓库中查看 Actions 页面的错误信息
```

## 🔒 安全注意事项

- 不要在代码中暴露 API Token
- 使用 GitHub Secrets 存储敏感信息
- 定期更新 Token 和权限
- 只给 Token 必要的权限

---

设置完成后，每次你推送新的版本标签，GitHub Actions 就会自动为你构建和发布扩展！ 🎉