# PromptFlow 移动端 App 开发指南

## 项目概述

使用 React Native (Expo) 开发 PromptFlow 移动端应用。

## 技术栈

- **框架**：React Native + Expo
- **语言**：TypeScript
- **状态管理**：Zustand
- **导航**：React Navigation
- **UI组件**：React Native Paper
- **HTTP请求**：Axios
- **云同步**：Firebase / Supabase
- **存储**：AsyncStorage

## 项目结构

```
PromptFlowApp/
├── app/                    # Expo Router 页面
│   ├── (tabs)/            # Tab 导航
│   │   ├── index.tsx      # 首页（提示词库）
│   │   ├── generator.tsx  # 智能生成器
│   │   ├── favorites.tsx  # 收藏夹
│   │   └── profile.tsx    # 个人中心
│   ├── reverse.tsx        # 反向提纯
│   ├── login.tsx          # 登录
│   └── register.tsx       # 注册
├── components/            # 组件
│   ├── PromptCard.tsx     # 提示词卡片
│   ├── CategoryFilter.tsx # 分类筛选
│   ├── SearchBar.tsx      # 搜索栏
│   └── ImageUpload.tsx    # 图片上传
├── constants/             # 常量
│   ├── prompts.ts         # 提示词数据
│   ├── theme.ts           # 主题配置
│   └── api.ts             # API配置
├── hooks/                 # 自定义Hooks
│   ├── useAuth.ts         # 认证
│   ├── usePrompts.ts      # 提示词
│   └── useSync.ts         # 云同步
├── services/              # 服务
│   ├── api.ts             # API调用
│   ├── storage.ts         # 本地存储
│   └── firebase.ts        # Firebase
├── store/                 # 状态管理
│   ├── authStore.ts       # 认证状态
│   └── promptStore.ts     # 提示词状态
├── types/                 # TypeScript类型
│   └── index.ts
├── app.json               # Expo 配置
├── package.json
└── tsconfig.json
```

## 核心功能

### 1. 提示词浏览
```typescript
// app/(tabs)/index.tsx
import { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { PromptCard } from '@/components/PromptCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SearchBar } from '@/components/SearchBar';
import { prompts } from '@/constants/prompts';

export default function Home() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  
  const filteredPrompts = prompts.filter(p => {
    const matchCategory = category === 'all' || p.category === category;
    const matchSearch = p.title.includes(search) || 
                       p.content.includes(search) ||
                       p.tags.some(t => t.includes(search));
    return matchCategory && matchSearch;
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <SearchBar value={search} onChange={setSearch} />
      <CategoryFilter selected={category} onSelect={setCategory} />
      <FlatList
        data={filteredPrompts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <PromptCard prompt={item} />}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}
```

### 2. 图片上传与反向提纯
```typescript
// app/reverse.tsx
import * as ImagePicker from 'expo-image-picker';
import { analyzeImage } from '@/services/api';

export default function Reverse() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await analyzeImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="选择图片" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {loading && <ActivityIndicator />}
    </View>
  );
}
```

### 3. 用户认证
```typescript
// services/auth.ts
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = { /* 你的配置 */ };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const login = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const register = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
```

## 启动项目

### 1. 创建项目
```bash
npx create-expo-app PromptFlowApp
cd PromptFlowApp
npm install @react-navigation/native @react-navigation/bottom-tabs
npx expo install expo-image-picker firebase
```

### 2. 配置主题
```typescript
// constants/theme.ts
export const theme = {
  colors: {
    primary: '#0ea5e9',
    secondary: '#a855f7',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#e2e8f0',
    textSecondary: '#94a3b8',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
};
```

### 3. 复制提示词数据
将 `index.html` 中的 `prompts` 数组复制到 `constants/prompts.ts`。

### 4. 运行
```bash
npx expo start
```

## 发布到应用商店

### Android (Google Play)
```bash
eas build --platform android
# 或
npx expo build:android
```

### iOS (App Store)
```bash
eas build --platform ios
# 或
npx expo build:ios
```

## 替代方案：微信小程序

如果想快速上线，可以考虑开发微信小程序：

### 优势
- 无需审核，即时发布
- 微信生态流量
- 用户无需下载

### 限制
- 需要适配小程序API
- 功能受限（部分API不可用）
- 需要微信账号

### 开发建议

使用 Taro 或 Uni-app 一套代码多端运行：

```bash
# 使用 Taro
npx @tarojs/cli init PromptFlowMiniApp
```

## 建议优先级

1. **微信小程序** - 快速上线，零成本
2. **React Native Expo** - 原生体验，跨平台
3. **Flutter** - 性能最佳，学习成本高

---

更多信息请参考：
- [Expo 文档](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Firebase React Native](https://rnfirebase.io/)