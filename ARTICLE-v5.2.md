# 我把落地页做成了"手电筒解密"—— 聊聊 PromptFlow v5.2 的六层视觉设计

> 一个纯前端落地页，怎么让用户打开三秒就不想关掉？

---

先上地址，边看边聊：**[PromptFlow 落地页](https://llyhy.github.io/promptflow/landing-v5.html)**

---

## 背景

PromptFlow 是我做的一个免费 AI 提示词工具集，纯前端，GitHub Pages 托管。之前的落地页跳出率 60%——用户进来扫一眼就走了。

我盯着 GA 数据看了很久，想明白了一件事：**不是内容不够好，是第一屏没有给到"打开产品"的冲动。**

v5.2 我推翻了整个落地页的设计语言，从布局到动效到背景系统全部重写。这篇文章拆解我做的六件事，全是原生 CSS + JS，零依赖。

---

## 第一层：暗金配色系统 —— 别再用蓝紫渐变

现在十个 AI 工具落地页九个是蓝紫渐变，已经审美疲劳了。

我选了 **Ink Black（`#08080c`） + Warm Gold（`#c8a45a`）**。暗到极致的墨水底，配上一抹暖金作为唯一强调色。

```css
:root {
    --ink: #08080c;
    --gold: #c8a45a;
    --gold-dim: #8b7340;
    --text: #e8e4dd;
    --text-dim: #908c84;
}
```

金色不是用来"装饰"的——它是唯一的彩色。按钮、高亮文字、分割线、光标，全部只用这一种颜色。这让视觉层级非常清晰：用户一眼就知道"哪里能动、哪里重要"。

---

## 第二层：系统字体 + 点阵网格 —— 不依赖外部资源

上一版引了 4 组 Google Fonts，国内用户等 3-8 秒。这次只保留 **Playfair Display**（标题衬线体）和 **Instrument Sans**（正文无衬线），并有完整的 fallback。

背景不是单调的纯黑，用了一层 48px 间距的金色点阵：

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

关键是 `mask-image` —— 点阵只在中上部区域可见，底部自然淡出。如果不加这个遮罩，全屏密布的点阵会很累眼睛。

---

## 第三层：胶片颗粒 —— Canvas 生成的随机噪点

大部分高端设计网站都会有微妙噪点，这是一种"质感信号"。我用 Canvas 逐像素填充随机灰度值：

```javascript
function drawGrain() {
    const w = grainCanvas.width, h = grainCanvas.height;
    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 40;
        data[i] = v; data[i+1] = v; data[i+2] = v; data[i+3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
}
```

然后叠在全屏 `#grainLayer` 上，透明度 0.035，混合模式 overlay。不仔细看感觉不到，但去掉它页面立刻"塑料感"。

---

## 第四层：鼠标跟随光源 + 自定义光标

鼠标移动到哪，哪就亮起一个 600px 的金色柔光圆斑。配合自定义光标 —— 12px 金色实心圆点，悬停按钮时放大到 32px 并变成金圈。

```javascript
function animate() {
    const speed = 0.12;
    mouseX += (targetX - mouseX) * speed;
    mouseY += (targetY - mouseY) * speed;
    mouseLight.style.left = mouseX + 'px';
    mouseLight.style.top = mouseY + 'px';
    cursorDot.style.left = targetX + 'px';
    cursorDot.style.top = targetY + 'px';
    requestAnimationFrame(animate);
}
```

光源做缓动（lerp 系数 0.12），光标直跟。这样光源有"拖尾感"但光标精准，体验不粘腻。

触屏设备自动隐藏光源和自定义光标，回退系统默认。

---

## 第五层：浮动光球 + 扫描线 —— 让背景"活"起来

3 个不同大小、不同位置的金色发光球体，以 18-22 秒的周期缓慢漂移：

```css
@keyframes orbFloat {
    0%, 100% { transform: translate(0, 0); }
    25%      { transform: translate(30px, -20px); }
    50%      { transform: translate(-15px, 25px); }
    75%      { transform: translate(20px, 10px); }
}
```

底部加了一条 4 秒脉冲的金色扫描线。这些元素都 `pointer-events: none`，不影响交互。

---

## 第六层（核心）：手电筒揭秘层

这是我最满意的一层。

原理很简单：一个全屏 div 里放了 20 个金色关键词 + 5 条装饰线 + 3 个几何圆。用 CSS `mask-image` 把它们全部遮住，只在鼠标所在的 280px 半径圆内显示。

```css
#revealLayer {
    -webkit-mask-image: radial-gradient(
        circle 280px at 50% 50%, black 20%, transparent 70%
    );
    mask-image: radial-gradient(
        circle 280px at 50% 50%, black 20%, transparent 70%
    );
}
```

JS 实时更新 `mask-position`：

```javascript
const mx = (e.clientX / window.innerWidth * 100).toFixed(1);
const my = (e.clientY / window.innerHeight * 100).toFixed(1);
revealLayer.style.maskPosition = mx + '% ' + my + '%';
```

藏着的内容：

```
PromptFlow  cinematic  cyberpunk  neon lights
golden hour  volumetric  8K quality  anime style
portrait  masterpiece  landscape  symmetry
close-up  watercolor  minimalist  oil painting
backlight  创造 ✦ 提纯 ✦ 设计
```

鼠标在空白区域慢慢移动，金色文字和线条从黑暗中逐一浮现，**像解密一样**。

这层的体验价值在于：它让用户在本能地移动鼠标"探索"页面的过程中，不自觉地阅读了产品关键词。比任何 banner 都有效。

---

## 为什么这些设计能降低跳出率

| 设计决策 | 解决的问题 |
|---|---|
| 暗金配色 | 跳出"蓝紫 AI 工具"同质化，建立视觉记忆 |
| 点阵+颗粒+光球+扫描线 | 背景不再死板，有"活"的感觉 |
| 鼠标光源 | 即时反馈，鼠标不只是工具而是体验的一部分 |
| 手电筒揭秘 | 好奇心驱动探索，"扫到文字"的快感 |
| Hero 即时输入框 | 零步跳转到产品，打开就能用 |

---

## 完整技术栈

- 纯 HTML + CSS + JS，零框架、零依赖
- Canvas API 生成噪点纹理
- CSS mask-image 实现手电筒效果
- Intersection Observer 实现滚动触发淡入
- requestAnimationFrame 驱动鼠标跟随
- CSS custom properties 管理配色系统

---

## 开源地址

**GitHub**: [LLyhy/promptflow](https://github.com/LLyhy/promptflow)

**直接体验**: [llyhy.github.io/promptflow/landing-v5.html](https://llyhy.github.io/promptflow/landing-v5.html)

**产品主页**: [llyhy.github.io/promptflow](https://llyhy.github.io/promptflow/)

---

> *如果你也在做独立项目，强烈建议试试"手电筒揭秘"这个交互。它比任何 CTA 按钮都能让用户停留更久。*
