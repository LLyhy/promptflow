# PromptFlow 云端同步配置指南

## 概述

本项目支持通过 Firebase 实现云端数据同步，包括：
- 用户认证（邮箱/微信登录）
- 收藏夹云同步
- 使用历史云同步
- 提交提示词云存储

## Firebase 配置步骤

### 1. 创建 Firebase 项目

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 点击"添加项目"
3. 输入项目名称：promptflow
4. 关闭 Google Analytics（可选）
5. 点击"创建项目"

### 2. 启用身份验证

1. 在左侧菜单点击"构建" → "身份验证"
2. 点击"开始使用"
3. 在"原生提供商"中启用：
   - ✅ 电子邮件/密码
   - ✅ Google（可选）

### 3. 创建实时数据库

1. 在左侧菜单点击"构建" → "实时数据库"
2. 点击"创建数据库"
3. 选择区域：asia-east1（台湾）或 us-central
4. 选择"以测试模式启动"
5. 点击"启用"

### 4. 获取配置信息

1. 点击右上角"设置"图标
2. 选择"项目设置"
3. 滚动到"你的应用"部分
4. 点击 Web 图标（</>）
5. 注册应用（输入昵称：promptflow-web）
6. 复制 Firebase 配置对象

配置对象类似：
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "promptflow.firebaseapp.com",
  databaseURL: "https://promptflow-default-rtdb.firebaseio.com",
  projectId: "promptflow",
  storageBucket: "promptflow.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 5. 更新代码

将配置添加到 `index.html` 中的 Firebase 初始化代码：

```html
<script type="module">
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
  import { getDatabase, ref, set, get } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';

  // 替换为你的 Firebase 配置
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  // 初始化 Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);
</script>
```

## 功能实现

### 用户认证

```javascript
// 注册
async function register(email, password, username) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  // 保存用户信息到数据库
  await set(ref(database, 'users/' + user.uid), {
    username: username,
    email: email,
    createdAt: Date.now()
  });
  
  return user;
}

// 登录
async function login(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// 登出
function logout() {
  signOut(auth);
}
```

### 数据同步

```javascript
// 保存收藏夹到云端
async function syncFavoritesToCloud(favorites) {
  const user = auth.currentUser;
  if (!user) return;
  
  await set(ref(database, 'users/' + user.uid + '/favorites'), favorites);
}

// 从云端获取收藏夹
async function getFavoritesFromCloud() {
  const user = auth.currentUser;
  if (!user) return null;
  
  const snapshot = await get(ref(database, 'users/' + user.uid + '/favorites'));
  return snapshot.val();
}
```

## 免费额度

Firebase Spark（免费）计划：

| 功能 | 免费额度 |
|------|----------|
| 身份验证 | 每月10,000次登录 |
| 实时数据库 | 1GB存储 + 100GB/月下载 |
| Hosting | 10GB存储 + 360MB/天 |

## 部署到 Firebase Hosting

1. 安装 Firebase CLI：
```bash
npm install -g firebase-tools
```

2. 登录 Firebase：
```bash
firebase login
```

3. 初始化项目：
```bash
firebase init hosting
```

4. 选择：
   - Public directory: `public`（或 `.`）
   - Single-page app: No
   - Distribute: No

5. 部署：
```bash
firebase deploy
```

## 注意事项

⚠️ **安全规则**：部署前请在 Firebase Console 中配置数据库安全规则：

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

## 替代方案

如果不想使用 Firebase，也可以考虑：

1. **Supabase** - PostgreSQL + 实时订阅，开源免费
2. **Cloudflare Workers** - 边缘计算 + KV存储
3. **MongoDB Atlas** - NoSQL 数据库，免费额度1GB

---

如有问题，请在 GitHub 提交 Issue。