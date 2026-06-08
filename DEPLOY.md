# PromptFlow 部署指南

## 🚀 方案一：Vercel 部署（推荐）

### 步骤 1：注册 GitHub 账号
- 访问 https://github.com 注册账号
- 登录 GitHub

### 步骤 2：创建仓库
1. 点击 GitHub 右上角的 "+" → "New repository"
2. 仓库名称：`promptflow`（或你喜欢的名字）
3. 选择 "Public" 或 "Private"
4. 点击 "Create repository"

### 步骤 3：上传项目文件
按照 GitHub 页面的提示，在本地执行以下命令（需要安装 Git）：
```bash
cd d:\产品\promptflow
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/promptflow.git
git push -u origin main
```

### 步骤 4：连接 Vercel
1. 访问 https://vercel.com 用 GitHub 登录
2. 点击 "New Project"
3. 选择你的 `promptflow` 仓库
4. 点击 "Deploy"
5. 等待 1-2 分钟，部署成功！

### 步骤 5：访问网站
部署成功后，Vercel 会给你一个类似 `https://promptflow-xxxxx.vercel.app` 的网址

---

## 📦 方案二：GitHub Pages 部署

### 步骤 1：创建仓库
和上面一样，先在 GitHub 创建仓库并上传代码

### 步骤 2：启用 GitHub Pages
1. 进入仓库的 "Settings"
2. 找到 "Pages" 选项
3. 在 "Source" 中选择：
   - Branch: `main`
   - Folder: `/ (root)` 或 `public/`
4. 点击 "Save"

### 步骤 3：访问网站
等待几分钟后，你可以通过 `https://你的用户名.github.io/promptflow/` 访问

---

## 💡 提示

### 项目结构说明
```
promptflow/
├── public/
│   ├── index.html      ← 首页
│   ├── reverse.html    ← 反向提纯页
│   ├── wechat-qr.png   ← 微信赞赏码
│   └── alipay-qr.png   ← 支付宝赞赏码
└── vercel.json         ← Vercel 配置
```

### 常见问题

**Q: 我的项目是纯 HTML 吗？**
A: 是的！你的项目是纯 HTML/CSS/JavaScript，部署特别简单。

**Q: 我需要改域名吗？**
A: 先用免费的，后期想换再买域名绑定。

**Q: 国内访问慢怎么办？**
A: Vercel 在国内访问还可以，如果确实慢可以考虑其他方案。

---

## 🎯 快速开始（最推荐）

最简单的方法：
1. 注册 GitHub
2. 上传你的代码到 GitHub 仓库
3. 用 GitHub 账号登录 Vercel
4. 一键部署！

就这么简单！大概 10 分钟就能搞定！🎉
