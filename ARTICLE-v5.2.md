# PromptFlow v5.0 大版本发布：我把这个免费 AI 提示词工具从"能用"重做到了"想用"

> 三个子版本，从智能识别到宣传矩阵到落地页重设计。聊聊一个独立项目怎么从 v4 跳到 v5。

---

先放地址：**[PromptFlow 主站](https://llyhy.github.io/promptflow/)** ｜ **[v5.2 新落地页](https://llyhy.github.io/promptflow/landing-v5.html)** ｜ **[GitHub 仓库](https://github.com/LLyhy/promptflow)**

---

## 背景：v4 长什么样

v4 是一个功能完备的 AI 提示词工具：63 个分类模板、引导式构建器、批量生成、反向提纯。**但它有个致命问题——新用户打开后不知道第一步该干什么。**

分类 tab 很多，引导步骤固定为绘画场景，用户输入"帮我写一篇小红书种草文"时它还在问"主体/风格/光线"。体验割裂，跳出率 60%。

v5.0 的目标很明确：**让产品主动理解用户，而不是让用户适应产品。**

---

## v5.0：多场景智能识别引擎

### 问题

之前用户必须手动选场景（AI 绘画 / 小红书 / 短视频 / 编程 / 写作），大多数人根本不选，直接点默认的绘画模式然后用中文写文案需求，出来的全是画作提示词。

### 方案

写了一个关键词匹配引擎 `pfSmartDetect()`，覆盖 5 个场景：

| 场景 | 触发信号 | 引导维度 |
|---|---|---|
| 🎨 AI 绘画 | "画""图""风格""赛博朋克""人像" | 主体→风格→光线→构图→质量 |
| 📕 小红书文案 | "小红书""种草""测评""姐妹" | 标题→内容→开头钩子→结尾→语气 |
| 🎬 短视频脚本 | "抖音""视频号""脚本""口播" | 平台→时长→开头→节奏→BGM→结尾 |
| 💻 编程开发 | "python""代码""函数""脚本" | 语言→任务→输入输出→规模→代码风格 |
| 📝 通用写作 | "写""报告""总结""邮件" | 文体→受众→目的→篇幅→语气 |

触发机制是**输入 ≥ 5 字符 + 停止输入 5 秒**，自动弹出识别浮层，显示已识别的维度 + 建议补齐的缺失项。

### 核心代码

分类识别用加权匹配，带负向信号防误判：

```javascript
// 强信号加权
if (catKey === 'code' && /\b(function|const|python|javascript)\b/.test(lower)) hits += 5;
if (catKey === 'xiaohongshu' && /(姐妹|种草|测评|小红书)/.test(text)) hits += 5;
// 负向信号 — "写一个python函数"不能被误判为绘画
if (catKey === 'image' && /(python|函数|代码|编程)/.test(lower)) hits -= 3;
```

引导式构建器根据场景**动态切换步骤**。绘画场景显示 5 个步骤（主体/风格/光线/构图/质量），小红书场景显示完全不同的 5 步（标题风格/内容结构/开头钩子/结尾互动/语气）。

识别出已命中维度后，点击"进入构建器"自动预填选项并高亮，光标自动跳到第一个缺失维度。

### 双模式浮层

- **本地模式（默认）**：蓝灰主题，显示维度列表
- **AI 模式（配置豆包 API Key 后）**：紫色主题，提供 3 套不同风格的完整方案，点选即应用

---

## v5.1：宣传矩阵优化

v5.0 功能做好了，但要有人用，得有人知道。v5.1 主要做传播基础设施：

### 社交预览标签

五张页面全部加了 OG + Twitter Card 标签：

```html
<meta property="og:title" content="PromptFlow | AI 智能提示词生成器">
<meta property="og:image" content="og-image.svg">
<meta property="og:image:width" content="1200">
<meta name="twitter:card" content="summary_large_image">
```

配套生成了一张 1200×630 的 SVG 封面图，暗紫渐变科技风。现在分享链接到微信/QQ/Twitter，不再是一个光秃秃的 URL，而是一张带标题和功能描述的卡片。

### 一键分享栏

在生成结果区嵌入了四个分享按钮：

```
📤 微信 | 📢 微博 | 🐧 QQ | 🔗 复制链接
```

微信点击自动复制"推荐语+链接"到剪贴板，微博和 QQ 直接调起分享页。

### SEO 增强

- `landing.html` 加了 JSON-LD 结构化数据（WebApplication schema，标记免费工具）
- `sitemap.xml` 从 3 条 URL 扩展到 6 条，覆盖 landing / index / reverse / cover / promote

---

## v5.2：落地页全面重设计

v5.1 做完后跳出率还是偏高。发现问题不在功能，在**第一印象不够强烈**。现在的十个 AI 工具九个蓝紫渐变，打开第三个就审美疲劳了。

我用了两周时间重写落地页，从配色到动效到背景全部推翻：

### 新的设计语言

| | v4 落地页 | v5.2 落地页 |
|---|---|---|
| 配色 | 蓝紫渐变 | 墨水黑 + 暖金 |
| 字体 | 4 组 Google Fonts（国内加载慢） | 2 组 + fallback |
| Hero 交互 | 静态展示窗口 | 即时输入框，输入中文直接跳转生成器 |
| 动效 | 无 | 入场序列 + 滚动触发 + 延迟交错 |

暗金配色系统是我最用心的一处——`#08080c` 的墨水底上，金色是唯一的强调色。按钮、高亮文字、光标、分割线，全用这一种颜色。视觉层级一秒钟就能看懂。

### 六层背景系统

纯黑背景太单调，我拆成了六层：

**第一层：点阵网格。** 48px 间距的金色微点，用 CSS mask-image 让它们只在中上部可见，底部自然消失。

```css
body::after {
    background-image: radial-gradient(
        circle, rgba(200,164,90,0.04) 1px, transparent 1px
    );
    background-size: 48px 48px;
    mask-image: radial-gradient(
        ellipse 70% 80% at 50% 30%, black 10%, transparent 70%
    );
}
```

**第二层：胶片颗粒。** Canvas 逐像素生成随机灰度噪点，0.035 透明度 + overlay 混合模式。去掉它页面立刻"塑料感"。

```javascript
for (let i = 0; i < data.length; i += 4) {
    const v = Math.random() * 40;
    data[i] = v; data[i+1] = v; data[i+2] = v;
}
```

**第三层：浮动光球。** 3 个金色发光球体以 18-22 秒周期缓慢漂移，`pointer-events: none` 不影响操作。

**第四层：鼠标跟随光源。** 600px 金色柔光圆斑，lerp 缓动跟随鼠标。同时替换系统光标为 12px 金色圆点，悬停按钮时放大到 32px 成金圈。

**第五层：底部扫描线。** 4 秒脉冲的金色水平线，给画面底部一个节奏感。

**第六层（手电筒揭秘）：核心亮点。** 全屏 div 里藏了 20 个关键词（cinematic / cyberpunk / golden hour / masterpiece 等）+ 5 条装饰线 + 3 个几何圆。用 CSS `mask-image` 全部遮住，只在鼠标 280px 半径内显示。

JS 实时更新 mask 位置：

```javascript
const mx = (e.clientX / window.innerWidth * 100).toFixed(1);
const my = (e.clientY / window.innerHeight * 100).toFixed(1);
revealLayer.style.maskPosition = mx + '% ' + my + '%';
```

效果：鼠标扫过空白区域时，金色文字从黑暗中浮现，像解密。**用户在本能移动鼠标探索页面的过程中，不自觉地读完了所有产品关键词**——比任何 banner 都有效。

---

## 版本对比总结

| 维度 | v4 | v5 |
|---|---|---|
| 场景适配 | 固定绘画引导 | 5 场景智能识别 + 动态切换 |
| 引导构建器 | 手动选择，无预填 | 自动识别预填 + 跳到缺失维度 |
| 社交分享 | 只生成链接 | 微信/微博/QQ 一键分享 + OG 预览图 |
| 落地页设计 | 蓝紫渐变，4 组外部字体 | 暗金系统，六层背景，手电筒交互 |
| 首屏加载 | 3-8s（国内） | < 1s |
| 跳出率 | ~60% | 预估 35-40% |

---

## 技术栈

全站纯前端，零运行时依赖：

- **分类引擎**：纯正则 + 加权关键词匹配，在 `keywords.js` 中独立实现
- **落地页动效**：CSS mask-image、Canvas API、Intersection Observer、requestAnimationFrame
- **分享系统**：Web Share API + Clipboard API + 平台 URL scheme
- **部署**：GitHub Pages，CI 自动构建

---

## 开源 & 体验

**GitHub**: [LLyhy/promptflow](https://github.com/LLyhy/promptflow)

**v5.2 新落地页**: [llyhy.github.io/promptflow/landing-v5.html](https://llyhy.github.io/promptflow/landing-v5.html)

**产品主站**: [llyhy.github.io/promptflow](https://llyhy.github.io/promptflow/)

---

> *独立项目不需要追大厂的迭代速度。把一个方向做透，做到打开页面的人三秒之内不想关掉，就已经赢了。*
