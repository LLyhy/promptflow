

// ============================================================
// v5.0 Smart Detect: 场景分类识别 + 反向引导系统
// 支持 5 大场景：AI绘画 / 小红书文案 / 短视频脚本 / 编程开发 / 通用写作
// ============================================================

// ---------- 5.1 场景分类关键词库（中文）----------
// 用于识别用户"想要什么类型的输出"
const K_CATEGORY_KEYWORDS = {
    image: {
        name: 'AI 绘画',
        emoji: '🎨',
        triggers: ['画', '图', '图片', '绘画', '插画', '生成图', '图像', '视觉', '风格', '构图', '光线', '人像', '风景', '动漫', '赛博朋克', '油画', '水彩', '渲染', '照片', '写真', '肖像', '壁纸', '封面图', '头像']
    },
    xiaohongshu: {
        name: '小红书文案',
        emoji: '📕',
        triggers: ['小红书', '笔记', '种草', '测评', '分享', '体验', '探店', '好物', '推荐', '搭配', '妆容', '护肤', '穿搭', '旅游攻略', '开箱', '避雷', '干货', '宝子', '姐妹们', 'yyds']
    },
    video: {
        name: '短视频脚本',
        emoji: '🎬',
        triggers: ['短视频', '抖音', '视频号', '快手', 'b站', '脚本', '口播', 'vlog', 'vlog', '视频', '拍摄', '剪辑', '镜头', '画面', 'bgm', '音乐', '节奏', '开场', '开头3秒']
    },
    code: {
        name: '编程开发',
        emoji: '💻',
        triggers: ['代码', '编程', 'python', 'javascript', 'java', 'c++', 'typescript', 'html', 'css', 'react', 'vue', '写个', '函数', '脚本', '程序', '算法', '实现', 'bug', '接口', 'api', '数据库', '网页', '网站', 'app']
    },
    writing: {
        name: '通用写作',
        emoji: '📝',
        triggers: ['写', '写作', '文章', '作文', '总结', '报告', '文案', '演讲稿', '邮件', '情书', '自我介绍', '简历', '检讨书', '请假条', '通知', '公告', '新闻', '小说', '故事']
    }
};

// ---------- 5.2 AI 绘画各维度中文关键词（用于维度识别和预填）----------
// ---------- 5.2 通用关键词库（所有场景共享，结构统一） ----------
// 统一格式：{ label, keywords: [中英文混合], hint: string }
const K_IMG_DIM_KEYWORDS = {
    style: {
        name: '风格',
        emoji: '🎭',
        options: [
            { label: '写实摄影', keywords: ['写实', '真实', '照片', '摄影', '写真', '高清', '逼真', 'photorealistic', 'realistic'], hint: 'photorealistic, ultra realistic, professional photography' },
            { label: '日系动漫', keywords: ['动漫', '二次元', '日系', '漫画', '动画', '插画', 'anime', 'manga'], hint: 'anime style, Japanese animation, vibrant colors, clean line art' },
            { label: '赛博朋克', keywords: ['赛博朋克', '赛博', '朋克', '科幻', '未来', '霓虹', '高科技', 'cyberpunk', 'sci-fi'], hint: 'cyberpunk, neon lights, futuristic city, holographic, sci-fi' },
            { label: '油画质感', keywords: ['油画', '古典', '艺术'], hint: 'oil painting, classical art, impasto texture, fine art' },
            { label: '水彩清新', keywords: ['水彩', '清新', '淡雅'], hint: 'watercolor painting, soft colors, delicate brushwork' },
            { label: '极简主义', keywords: ['极简', '简约', '干净', '几何', '留白', 'minimalist'], hint: 'minimalist, clean composition, geometric shapes, negative space' },
            { label: '3D 渲染', keywords: ['3d', '三维', '渲染', '皮克斯'], hint: '3D render, octane render, Pixar style, volumetric lighting' },
            { label: '中国水墨', keywords: ['水墨', '国画', '禅意', '中式', '山水'], hint: 'Chinese ink painting, traditional art, zen atmosphere, oriental art' }
        ]
    },
    lighting: {
        name: '光线',
        emoji: '💡',
        options: [
            { label: '黄金时刻', keywords: ['黄昏', '日落', '日出', '傍晚', '夕阳', '黄金', 'golden hour', '日落时分', '黄昏时分'], hint: 'golden hour lighting, sunset backlight, warm tones' },
            { label: '柔和光线', keywords: ['柔和', '柔光', '自然光', '窗边', '柔', 'soft light', '自然光照'], hint: 'soft daylight, diffused light, softbox lighting, natural window light' },
            { label: '霓虹光', keywords: ['霓虹', '发光', '夜光', 'neon', '霓虹灯'], hint: 'neon glow, neon lights, neon reflections' },
            { label: '电影级光影', keywords: ['电影', '光影', '戏剧', '氛围光', 'cinematic', '电影级', '电影感'], hint: 'cinematic lighting, dramatic chiaroscuro, volumetric light' },
            { label: '逆光/轮廓光', keywords: ['逆光', '轮廓', '剪影', '边缘光', 'rim light'], hint: 'backlighting, rim light, god rays, silhouette' },
            { label: '月光夜景', keywords: ['月光', '夜晚', '夜色', '星光', '夜景', '月亮', '星空'], hint: 'moonlight, night scene, starry sky, moody lighting' },
            { label: '棚拍灯光', keywords: ['棚拍', '工作室', '影棚', 'studio', '摄影棚', '灯光'], hint: 'studio lighting, three-point lighting, LED panel lights' },
            { label: '高反差', keywords: ['高对比', '硬朗', '高反差', '明暗', '对比', 'contrast'], hint: 'high contrast, dramatic shadows, bold lighting' }
        ]
    },
    composition: {
        name: '构图',
        emoji: '📐',
        options: [
            { label: '特写镜头', keywords: ['特写', '近景', '放大', '细节', 'close-up'], hint: 'close-up shot, macro, detailed view' },
            { label: '半身照', keywords: ['半身', '上半身', 'waist'], hint: 'half body shot, waist up, portrait composition' },
            { label: '全身照', keywords: ['全身', '完整', '从头到脚', 'full body'], hint: 'full body shot, full figure, complete view' },
            { label: '俯视角', keywords: ['俯视', '鸟瞰', '从上往下', 'top down'], hint: "top-down view, bird's eye view, aerial perspective" },
            { label: '仰视角', keywords: ['仰视', '低角度', '从下往上', 'low angle'], hint: 'low angle shot, looking up, dramatic perspective' },
            { label: '侧面轮廓', keywords: ['侧面', '侧影', '轮廓', 'profile'], hint: 'side view, profile shot, lateral view' },
            { label: '对称构图', keywords: ['对称', '居中', '平衡', 'symmetry'], hint: 'symmetrical composition, centered, balanced' },
            { label: '三分法', keywords: ['三分', '平衡构图', 'rule of thirds'], hint: 'rule of thirds, balanced composition, golden ratio' }
        ]
    },
    quality: {
        name: '质量',
        emoji: '✨',
        options: [
            { label: '8K 超高清', keywords: ['8k', '超高', '超清', 'masterpiece'], hint: '8K resolution, ultra high detail, masterpiece' },
            { label: '4K 高清', keywords: ['4k', '高清', '高分辨率', 'best quality'], hint: '4K resolution, high detail, high resolution' },
            { label: '电影级', keywords: ['电影', '胶片', 'cinematic', 'film'], hint: 'cinematic, film quality, movie still, cinematic framing' },
            { label: '杂志封面', keywords: ['杂志', '封面', '时尚', '时装', 'vogue'], hint: 'magazine cover, editorial, professional photography' },
            { label: '最佳渲染', keywords: ['最佳', '顶级', '最高', '精美', 'masterpiece'], hint: 'best quality, masterpiece, intricate details' },
            { label: '国家地理风格', keywords: ['国家地理', '地理', '纪实'], hint: 'national geographic style, documentary photography' }
        ]
    },
    subject: {
        name: '主体',
        emoji: '👤',
        options: [
            { label: '美丽女性', keywords: ['女性', '女人', '女孩', '少女', '女生', 'lady', 'woman', 'girl', '裙子', '连衣裙'], hint: 'beautiful young woman, elegant pose, gorgeous eyes' },
            { label: '帅气男性', keywords: ['男性', '男人', '男孩', '男生', '帅哥', '男士', 'man', 'boy'], hint: 'handsome man, confident expression, stylish' },
            { label: '萌宠动物', keywords: ['猫', '小猫', '猫咪', '狗', '小狗', '宠物', '动物', 'cat', 'dog', 'kitten', 'puppy', '小动物'], hint: 'cute animal, fluffy cat, adorable dog' },
            { label: '自然风景', keywords: ['风景', '山', '海', '海洋', '森林', '湖', '河', '海边', 'landscape', '自然'], hint: 'landscape, majestic mountains, peaceful forest, ocean view' },
            { label: '城市建筑', keywords: ['城市', '建筑', '街道', '高楼', '都市', 'city', '大厦', '摩天楼', '夜景'], hint: 'cityscape, modern architecture, urban street, skyscrapers' },
            { label: '产品静物', keywords: ['产品', '商品', '静物', '展示', '静物摄影'], hint: 'product photography, commercial shot, e-commerce photo' },
            { label: '机甲科幻', keywords: ['机甲', '机器人', '未来战士', 'robot', 'mecha', '机械'], hint: 'mecha, giant robot, futuristic armor, sci-fi warrior' },
            { label: '奇幻生物', keywords: ['龙', '精灵', '奇幻', '幻想', 'dragon', '魔法生物'], hint: 'fantasy creature, mythical beast, magical, ethereal' }
        ]
    }
};

// ---------- 5.3 非绘画场景的引导步骤配置 ----------
// 每个场景的引导步骤完全不同，以提供"专属感"
const K_SCENARIO_GUIDE_STEPS = {
    // ---------- 5.3.1 小红书文案 ----------
    xiaohongshu: {
        categoryLabel: '小红书文案',
        previewLabel: '笔记预览',
        generateButton: '📕 生成小红书笔记',
        steps: [
            {
                id: 'title_style',
                emoji: '💄',
                title: '标题风格',
                hint: '想要什么类型的标题？',
                options: [
                    { label: '爆款数字型（"3天瘦5斤的秘诀"）', tags: ['数字型标题', '效果承诺', '具体可量化'] },
                    { label: '情感共鸣型（"终于理解妈妈的付出"）', tags: ['情感标题', '共鸣型', '故事感'] },
                    { label: '悬念好奇型（"千万别学我这样…"）', tags: ['悬念标题', '反差感', '引人入胜'] },
                    { label: '种草安利型（"这支口红我回购了5次"）', tags: ['种草标题', '安利型', '推荐式'] },
                    { label: '清单整理型（"日本旅游必去的8个地方"）', tags: ['清单标题', '整理型', '收藏型'] },
                    { label: '对比测评型（"A品牌 vs B品牌，谁更值得买"）', tags: ['对比标题', '测评型', '客观分析'] }
                ],
                customLabel: '自定义标题风格'
            },
            {
                id: 'content_structure',
                emoji: '📝',
                title: '内容结构',
                hint: '正文怎么组织？',
                options: [
                    { label: '故事+干货（推荐·最吸睛）', tags: ['故事开头', '中段干货', '结尾金句', '总分总结构'] },
                    { label: '纯干货清单', tags: ['清单体', '123点', '实用主义', '信息密度高'] },
                    { label: '测评对比文', tags: ['测评结构', '优缺点对比', '真实体验', '购买建议'] },
                    { label: '日记体验流', tags: ['时间线', '真实感受', '流水账风格', '亲切感'] },
                    { label: '一问一答（FAQ 风格）', tags: ['问答结构', 'FAQ', '痛点先行', '答疑解惑'] }
                ],
                customLabel: '自定义结构'
            },
            {
                id: 'opening_hook',
                emoji: '🎣',
                title: '开头钩子',
                hint: '第一句怎么写？',
                options: [
                    { label: '数据冲击（"花了3000块踩坑后…"）', tags: ['数字开头', '冲击力', '引发好奇'] },
                    { label: '反常识悬念（"你以为的省钱其实更费钱"）', tags: ['反差开头', '打破预期', '悬念设置'] },
                    { label: '场景代入（"周末和闺蜜逛了一天街"）', tags: ['场景开头', '代入感', '生活化'] },
                    { label: '金句引言（"有人说，成年人的崩溃都是静悄悄的"）', tags: ['金句开头', '引发共鸣', '情绪价值'] },
                    { label: '直接点题（"今天给大家推荐5支口红"）', tags: ['直给型', '简单直接', '效率优先'] }
                ],
                customLabel: '自定义开头'
            },
            {
                id: 'ending_call',
                emoji: '💬',
                title: '结尾互动',
                hint: '结尾怎么引导互动？',
                options: [
                    { label: '提问互动（"你们觉得哪个色号最好看？"）', tags: ['提问结尾', '激发评论', '互动感'] },
                    { label: '总结金句（"爱自己是终身浪漫的开始"）', tags: ['金句结尾', '价值观输出', '感染力'] },
                    { label: '行动号召（"点赞收藏，下次不迷路"）', tags: ['CTA 结尾', '号召点赞收藏', '运营感'] },
                    { label: '预告留坑（"下篇讲我踩过的坑…"）', tags: ['预告结尾', '留悬念', '下次见'] },
                    { label: '开放式留白（"你有什么好方法？评论区聊聊"）', tags: ['开放结尾', '邀请讨论', '社区感'] }
                ],
                customLabel: '自定义结尾'
            },
            {
                id: 'tone',
                emoji: '🎭',
                title: '语气风格',
                hint: '整体用什么语气？',
                options: [
                    { label: '真诚闺蜜（推荐·最自然）', tags: ['闺蜜语气', '真诚', '亲切感', '不加修饰'] },
                    { label: '专业达人', tags: ['专业语气', '权威感', '有条理', '有经验'] },
                    { label: '俏皮可爱', tags: ['可爱语气', '颜文字', '活泼', '少女感'] },
                    { label: '理性客观', tags: ['客观语气', '中立理性', '数据分析', '不偏不倚'] },
                    { label: '文艺深情', tags: ['文艺语气', '文字优美', '有诗意', '情感丰沛'] }
                ],
                customLabel: '自定义语气'
            }
        ]
    },

    // ---------- 5.3.2 短视频脚本 ----------
    video: {
        categoryLabel: '短视频脚本',
        previewLabel: '脚本预览',
        generateButton: '🎬 生成视频脚本',
        steps: [
            {
                id: 'platform',
                emoji: '📱',
                title: '目标平台',
                hint: '在哪个平台发布？',
                options: [
                    { label: '抖音（15-60 秒）', tags: ['抖音风格', '快节奏', '开头3秒抓人', '竖屏'] },
                    { label: '视频号（1-3 分钟）', tags: ['视频号风格', '中长内容', '情感共鸣', '微信生态'] },
                    { label: 'B站（3-10 分钟）', tags: ['B站风格', '信息密度', '弹幕友好', '知识类'] },
                    { label: '快手（30-90 秒）', tags: ['快手风格', '接地气', '真实', '老铁文化'] },
                    { label: '小红书视频（30-180 秒）', tags: ['小红书视频', '文艺感', '生活方式', '精致画面'] }
                ],
                customLabel: '自定义平台'
            },
            {
                id: 'duration',
                emoji: '⏱️',
                title: '时长',
                hint: '大概多长？',
                options: [
                    { label: '15 秒 · 超短视频', tags: ['15秒', '超短', '一句话一个画面', '节奏极快'] },
                    { label: '30 秒 · 标准短视频', tags: ['30秒', '标准时长', '开头3秒', '中段内容', '结尾引导'] },
                    { label: '60 秒 · 完整叙事', tags: ['60秒', '1分钟', '完整起承转合', '信息量大'] },
                    { label: '3 分钟 · 中长视频', tags: ['3分钟', '中长视频', '分段结构', '适合干货'] },
                    { label: '5-10 分钟 · 长视频', tags: ['5-10分钟', '长视频', '深度内容', '分章节'] }
                ],
                customLabel: '自定义时长'
            },
            {
                id: 'opening',
                emoji: '🎣',
                title: '开头 3 秒钩子',
                hint: '怎么留住观众？',
                options: [
                    { label: '问题钩子（"你知道为什么…吗？"）', tags: ['问题开头', '引发好奇', '互动感'] },
                    { label: '反差悬念（"我被解雇的那天，老板送了我一个礼物…"）', tags: ['反常识悬念', '故事开头', '代入感'] },
                    { label: '视觉冲击（慢动作 + 特写 + 强 BGM）', tags: ['视觉钩子', '画面冲击', '慢动作', '特写镜头'] },
                    { label: '数据冲击（"我用这个方法 30 天瘦了 8 斤"）', tags: ['数字开头', '效果承诺', '具体可量化'] },
                    { label: '直接展示（成品/效果先上，过程后讲）', tags: ['结果先行', '展示型开头', 'WOW 效果'] }
                ],
                customLabel: '自定义开头'
            },
            {
                id: 'content_flow',
                emoji: '🎯',
                title: '内容节奏',
                hint: '正文怎么讲？',
                options: [
                    { label: '1-2-3 清单（适合教程/知识分享）', tags: ['清单体', '123结构', '清晰明了', '信息密度'] },
                    { label: '故事叙述（适合 Vlog / 个人经历）', tags: ['故事流', '时间线', '真实感受', '代入感'] },
                    { label: '问题-解决方案（适合干货/教学）', tags: ['问题解决型', '痛点先行', '方案在后', '结构清晰'] },
                    { label: '对比测评（适合种草/测评）', tags: ['对比结构', 'AB 对比', '优缺点', '购买建议'] },
                    { label: '情绪渲染（适合情感/励志类）', tags: ['情绪流', '金句穿插', 'BGM 铺垫', '结尾升华'] }
                ],
                customLabel: '自定义节奏'
            },
            {
                id: 'bgm',
                emoji: '🎵',
                title: 'BGM 风格',
                hint: '配什么音乐？',
                options: [
                    { label: '轻快流行（日常 Vlog 首选）', tags: ['轻快 BGM', '流行曲', '节奏感强', '日常感'] },
                    { label: '钢琴抒情（情感/励志类）', tags: ['钢琴曲', '抒情', '情感铺垫', '温柔氛围'] },
                    { label: '电子节拍（酷炫/科技类）', tags: ['电子 BGM', '节拍感', '现代感', '酷炫'] },
                    { label: '纯鼓点卡点（教程/快节奏）', tags: ['鼓点卡点', '快节奏', '教程配乐', '节奏感'] },
                    { label: '古典优雅（精致/文艺类）', tags: ['古典音乐', '优雅', '文艺感', '高质量感'] },
                    { label: '无 BGM · 纯口播（专注内容）', tags: ['无配乐', '纯人声', '清晰口播', '内容为王'] }
                ],
                customLabel: '自定义 BGM'
            },
            {
                id: 'ending',
                emoji: '👋',
                title: '结尾引导',
                hint: '最后一句说什么？',
                options: [
                    { label: '三连引导（"点赞+收藏+关注"）', tags: ['三连结尾', 'CTA', '引导关注'] },
                    { label: '评论区互动（"你怎么看？评论区聊"）', tags: ['互动结尾', '提问', '激发评论'] },
                    { label: '下期预告（"下期讲我踩过的坑"）', tags: ['预告结尾', '留悬念', '下次见'] },
                    { label: '金句升华（"爱自己，是终身浪漫的开始"）', tags: ['金句结尾', '价值观', '情绪高潮'] },
                    { label: '直接结束（简单感谢）', tags: ['简洁结尾', '感谢观看', '不拖泥带水'] }
                ],
                customLabel: '自定义结尾'
            }
        ]
    },

    // ---------- 5.3.3 编程开发 ----------
    code: {
        categoryLabel: '编程开发',
        previewLabel: '代码预览',
        generateButton: '💻 生成代码/方案',
        steps: [
            {
                id: 'language',
                emoji: '🔤',
                title: '语言/框架',
                hint: '用什么写？',
                options: [
                    { label: 'Python（脚本/数据/AI）', tags: ['Python', '脚本语言', '简洁', '数据处理'] },
                    { label: 'JavaScript / TypeScript（Web 前端）', tags: ['JavaScript', 'TypeScript', '前端', '浏览器'] },
                    { label: 'Node.js（后端/服务）', tags: ['Node.js', '后端', 'Express', 'API 服务'] },
                    { label: 'React / Vue（现代前端框架）', tags: ['React', 'Vue', '组件化', '现代前端'] },
                    { label: 'Java（后端/企业开发）', tags: ['Java', '后端', '企业级', 'Spring'] },
                    { label: 'Go / Rust（高性能系统级）', tags: ['Go', 'Rust', '高性能', '系统级编程'] },
                    { label: 'C++ / C#（游戏/桌面）', tags: ['C++', 'C#', '游戏开发', 'Unity'] },
                    { label: 'HTML + CSS（静态网页）', tags: ['HTML', 'CSS', '静态网页', '前端基础'] }
                ],
                customLabel: '自定义语言'
            },
            {
                id: 'task_type',
                emoji: '🎯',
                title: '任务类型',
                hint: '做什么功能？',
                options: [
                    { label: '写一个函数/方法', tags: ['函数实现', '单一职责', '可复用'] },
                    { label: '完整小脚本（可直接运行）', tags: ['完整脚本', '可执行', '自包含'] },
                    { label: '爬虫/数据抓取', tags: ['爬虫', '数据抓取', 'requests', 'API 调用'] },
                    { label: 'Web API / 接口', tags: ['API 开发', 'REST API', '后端接口', '路由'] },
                    { label: 'UI 组件/页面', tags: ['前端组件', 'UI 开发', '页面实现', '交互'] },
                    { label: '算法/数据结构', tags: ['算法实现', '数据结构', '效率优化', '复杂度'] },
                    { label: '数据库操作', tags: ['数据库', 'SQL', '增删改查', '数据持久化'] },
                    { label: '调试 / 修复 Bug', tags: ['Debug', '问题定位', '错误修复', '异常处理'] }
                ],
                customLabel: '自定义任务'
            },
            {
                id: 'input_output',
                emoji: '📥',
                title: '输入/输出',
                hint: '数据从哪来？到哪去？',
                options: [
                    { label: '命令行参数 → 控制台输出', tags: ['CLI', '命令行', 'stdin/stdout', '脚本'] },
                    { label: '文件读取 → 文件写入', tags: ['文件 I/O', '读写文件', 'CSV/JSON', '本地存储'] },
                    { label: 'HTTP 请求 → JSON 响应', tags: ['HTTP', 'REST', 'API', 'JSON 响应'] },
                    { label: '数据库 → 结构化数据', tags: ['数据库读写', 'SQL 查询', '数据表', '持久化'] },
                    { label: '用户交互 → 页面/UI 渲染', tags: ['用户交互', 'UI 渲染', '事件驱动', '前端'] },
                    { label: 'API 调用 → 处理后返回', tags: ['第三方 API', '数据转换', '中间件', '代理'] }
                ],
                customLabel: '自定义 I/O'
            },
            {
                id: 'complexity',
                emoji: '📊',
                title: '功能规模',
                hint: '做多完整？',
                options: [
                    { label: '简单 MVP（能跑就行）', tags: ['MVP', '最小可用', '简洁实现', '先跑起来'] },
                    { label: '稳健版本（加错误处理）', tags: ['稳健实现', '错误处理', '边界检查', '异常捕获'] },
                    { label: '工程化（模块化 + 注释 + 测试）', tags: ['工程化', '模块化', '文档注释', '单元测试'] },
                    { label: '生产级（性能 + 安全 + 日志）', tags: ['生产级', '性能优化', '安全检查', '日志监控'] }
                ],
                customLabel: '自定义规模'
            },
            {
                id: 'style',
                emoji: '🎨',
                title: '代码风格',
                hint: '怎么组织代码？',
                options: [
                    { label: '函数式（简洁清晰）', tags: ['函数式', '简洁', '可读性', '避免副作用'] },
                    { label: '面向对象（类/实例）', tags: ['OOP', '面向对象', '类与实例', '封装继承'] },
                    { label: '异步优先（Promise/async）', tags: ['异步编程', 'Promise', 'async/await', '非阻塞'] },
                    { label: '类型严谨（TypeScript/类型提示）', tags: ['类型严格', 'TypeScript', '类型安全', '静态检查'] },
                    { label: '极简一行流（能短则短）', tags: ['极简', '一行代码', 'Pythonic', '精简'] }
                ],
                customLabel: '自定义风格'
            }
        ]
    },

    // ---------- 5.3.4 通用写作（兜底场景）----------
    writing: {
        categoryLabel: '通用写作',
        previewLabel: '文稿预览',
        generateButton: '📝 生成文稿',
        steps: [
            {
                id: 'type',
                emoji: '📄',
                title: '文体类型',
                hint: '写什么？',
                options: [
                    { label: '工作汇报/总结', tags: ['工作总结', '汇报', '结构化', '数据支撑'] },
                    { label: '演讲稿/发言稿', tags: ['演讲稿', '口头表达', '情绪起伏', '金句'] },
                    { label: '正式邮件', tags: ['正式邮件', '商务语气', '结构清晰', '礼貌'] },
                    { label: '文章/专栏', tags: ['长文', '专栏', '论证结构', '观点明确'] },
                    { label: '自我介绍/简历', tags: ['自我介绍', '个人品牌', '亮点突出', '简洁有力'] },
                    { label: '创意写作/小说片段', tags: ['创意写作', '小说', '人物塑造', '场景描写'] },
                    { label: '通知/公告', tags: ['通知公告', '正式文体', '信息完整', '简洁'] }
                ],
                customLabel: '自定义文体'
            },
            {
                id: 'audience',
                emoji: '👥',
                title: '目标读者',
                hint: '写给谁看？',
                options: [
                    { label: '领导/上级（正式·恭敬）', tags: ['面向领导', '正式语气', '数据说话', '结论先行'] },
                    { label: '同事/团队（协作·高效）', tags: ['面向同事', '协作语气', '目标明确', '行动力'] },
                    { label: '客户/用户（服务·亲切）', tags: ['面向客户', '服务语气', '用户价值', '说服力'] },
                    { label: '学生/学习者（教学·易懂）', tags: ['面向学生', '教学语气', '通俗易懂', '循序渐进'] },
                    { label: '大众读者（普适·有趣）', tags: ['大众读者', '通俗易懂', '有趣有料', '传播性'] },
                    { label: '自己（日记/记录）', tags: ['写给自己', '私人语气', '真实感受', '无拘无束'] }
                ],
                customLabel: '自定义读者'
            },
            {
                id: 'purpose',
                emoji: '💡',
                title: '写作目的',
                hint: '想达到什么效果？',
                options: [
                    { label: '说明/告知（传递信息）', tags: ['说明性', '信息传递', '清晰准确'] },
                    { label: '说服/影响（改变想法）', tags: ['说服性', '逻辑论证', '情感共鸣', '行动引导'] },
                    { label: '表达/分享（抒发情感）', tags: ['表达性', '情感抒发', '个人观点', '真诚'] },
                    { label: '娱乐/趣味（轻松阅读）', tags: ['娱乐性', '趣味', '轻松', '段子感'] },
                    { label: '教学/指导（传授知识）', tags: ['教学性', '步骤清晰', '案例讲解', '可操作'] }
                ],
                customLabel: '自定义目的'
            },
            {
                id: 'length',
                emoji: '📏',
                title: '篇幅',
                hint: '写多长？',
                options: [
                    { label: '简短（100-300 字）', tags: ['短文', '精简', '要点突出', '快速阅读'] },
                    { label: '标准（300-800 字）', tags: ['标准长度', '完整内容', '适中', '易读'] },
                    { label: '详细（800-2000 字）', tags: ['长文', '详尽', '论证充分', '深度'] },
                    { label: '长文（2000 字以上）', tags: ['超长文', '系统性', '分章节', '深度研究'] }
                ],
                customLabel: '自定义篇幅'
            },
            {
                id: 'tone',
                emoji: '🎭',
                title: '语气风格',
                hint: '整体用什么语气？',
                options: [
                    { label: '正式专业', tags: ['正式', '专业', '严谨', '书面化'] },
                    { label: '友好亲切', tags: ['亲切', '友好', '温暖', '人情味'] },
                    { label: '简洁高效', tags: ['简洁', '效率', '不啰嗦', '直给'] },
                    { label: '热情活泼', tags: ['活泼', '热情', '有趣', '感染力'] },
                    { label: '严肃庄重', tags: ['严肃', '庄重', '正式', '仪式感'] },
                    { label: '文艺诗意', tags: ['文艺', '诗意', '优美', '文字感'] }
                ],
                customLabel: '自定义语气'
            }
        ]
    },

    // ---------- 5.3.5 AI 绘画（默认场景·最常用）----------
    image: {
        categoryLabel: 'AI 绘画',
        previewLabel: '提示词预览',
        generateButton: '🎨 生成提示词',
        steps: [
            {
                id: 'subject',
                emoji: '👤',
                title: '主体',
                hint: '画什么？',
                options: K_IMG_DIM_KEYWORDS.subject.options,
                customLabel: '自定义主体（输入你想画的事物）'
            },
            {
                id: 'style',
                emoji: '🎭',
                title: '风格',
                hint: '什么艺术风格？',
                options: K_IMG_DIM_KEYWORDS.style.options,
                customLabel: '自定义风格'
            },
            {
                id: 'lighting',
                emoji: '💡',
                title: '光线',
                hint: '怎么打光？',
                options: K_IMG_DIM_KEYWORDS.lighting.options,
                customLabel: '自定义光线'
            },
            {
                id: 'composition',
                emoji: '📐',
                title: '构图',
                hint: '画面怎么安排？',
                options: K_IMG_DIM_KEYWORDS.composition.options,
                customLabel: '自定义构图'
            },
            {
                id: 'quality',
                emoji: '✨',
                title: '质量',
                hint: '质量要求？',
                options: K_IMG_DIM_KEYWORDS.quality.options,
                customLabel: '自定义质量'
            }
        ]
    }
};

// ---------- 5.4 核心：智能识别函数 ----------
// 输入：用户原始输入字符串
// 输出：{ category, categoryName, categoryEmoji, detected, missing, confidence, rawInput }
function pfSmartDetect(input) {
    if (!input || !input.trim()) return null;
    const text = input.trim();
    const lower = text.toLowerCase();

    // -------- Step 1: 分类识别（带加权 + 负向信号防误判） --------
    let bestCategory = 'image';
    let bestCategoryHits = 0;
    Object.entries(K_CATEGORY_KEYWORDS).forEach(([catKey, cat]) => {
        let hits = 0;
        cat.triggers.forEach(kw => {
            if (lower.includes(kw.toLowerCase())) hits++;
        });
        // 分类强信号（带权）
        if (catKey === 'code' && /\b(function|const|let|var|if|else|for|while|class|import|def|return|python|javascript|java|html|css)\b/.test(lower)) hits += 5;
        if (catKey === 'code' && /[(){}\[\];=]/.test(text)) hits += 1;
        if (catKey === 'xiaohongshu' && /(姐妹|宝子|yyds|种草|测评|小红书|笔记|探店|好物|推荐|搭配)/.test(text)) hits += 5;
        if (catKey === 'video' && /(抖音|视频|视频号|快手|短视频|脚本|口播|vlog|拍摄|剪辑|bgm|节奏|镜头)/.test(text)) hits += 4;
        if (catKey === 'writing' && /(年终总结|工作报告|演讲稿|邮件|检讨|自我介绍|简历|通知|公告|文章|写作)/.test(text)) hits += 5;
        if (catKey === 'image' && /(photorealistic|cinematic|anime|illustration|painting|render|portrait|landscape|golden\s*hour|8k|4k|3d|特写|构图|光线|风格|绘画|插画|封面|头像|壁纸)/.test(lower)) hits += 3;
        // 负向信号 — 若输入明显是代码类关键词但被归类为 image 时降权
        if (catKey === 'image' && /(python|函数|代码|编程|javascript|java|react|vue)/.test(lower)) hits -= 3;
        if (catKey === 'writing' && /(python|函数|代码|编程|javascript|react)/.test(lower)) hits -= 3;
        if (catKey === 'xiaohongshu' && /(python|函数|代码|编程)/.test(lower)) hits -= 2;
        if (catKey === 'video' && /(python|代码|函数|编程)/.test(lower)) hits -= 2;

        if (hits > bestCategoryHits) {
            bestCategoryHits = hits;
            bestCategory = catKey;
        }
    });
    if (bestCategoryHits === 0) bestCategory = 'image'; // 默认 AI 绘画

    // -------- Step 2: 按场景做维度识别 --------
    const scenarioConfig = K_SCENARIO_GUIDE_STEPS[bestCategory];
    const detected = {};
    const missing = [];

    if (!scenarioConfig || !scenarioConfig.steps) {
        return {
            category: bestCategory,
            categoryName: K_CATEGORY_KEYWORDS[bestCategory].name,
            categoryEmoji: K_CATEGORY_KEYWORDS[bestCategory].emoji,
            detected: {},
            missing: [],
            confidence: 0,
            rawInput: text
        };
    }

    scenarioConfig.steps.forEach(step => {
        let bestOpt = null;
        let bestOptHits = 0;
        step.options.forEach(opt => {
            // 从 opt.keywords 读关键词（统一结构）；
            // 兼容旧结构：若有 opt.zh 用 zh，若有 opt.tags 用 tags 当关键词
            const kws = opt.keywords || opt.zh || opt.tags || [];
            let hits = 0;
            kws.forEach(kw => {
                if (!kw) return;
                const kwLower = kw.toString().toLowerCase();
                if (kwLower.length < 1) return;
                if (lower.includes(kwLower)) hits += (kwLower.length >= 2 ? 1 : 0.5);
            });
            // 也测试英文提示（如"cinematic"）
            if (opt.hint && typeof opt.hint === 'string') {
                const hintLower = opt.hint.toLowerCase();
                const enWords = lower.match(/[a-z]{2,}/g) || [];
                enWords.forEach(w => {
                    if (hintLower.includes(w)) hits += 0.5;
                });
            }
            if (hits > bestOptHits) {
                bestOptHits = hits;
                bestOpt = opt;
            }
        });
        // 需要至少 1 个命中才记录（浮点比较）
        if (bestOpt && bestOptHits >= 1) {
            // 兼容两种数据结构：opt.tags 数组或 opt.hint 字符串
            let valueStr;
            if (Array.isArray(bestOpt.tags) && bestOpt.tags.length > 0) {
                valueStr = bestOpt.tags.join(', ');
            } else if (bestOpt.hint) {
                valueStr = bestOpt.hint;
            } else {
                valueStr = bestOpt.label;
            }
            detected[step.id] = {
                stepId: step.id,
                label: bestOpt.label,
                value: valueStr,
                en: bestOpt.hint || valueStr
            };
        } else {
            missing.push(step.id);
        }
    });

    // -------- Step 3: 置信度 --------
    const totalDims = scenarioConfig.steps.length;
    const detectedDims = Object.keys(detected).length;
    const confidence = totalDims > 0 ? detectedDims / totalDims : 0;

    return {
        category: bestCategory,
        categoryName: K_CATEGORY_KEYWORDS[bestCategory].name,
        categoryEmoji: K_CATEGORY_KEYWORDS[bestCategory].emoji,
        detected,
        missing,
        confidence,
        rawInput: text
    };
}

// ---------- 5.4.1 统一获取 option 的显示值（兼容两种数据结构） ----------
function pfGetOptionValue(opt) {
    if (Array.isArray(opt.tags) && opt.tags.length > 0) return opt.tags.join(', ');
    if (opt.hint) return opt.hint;
    return opt.label;
}

// ---------- 5.5 预填结果 → 输出成最终提示词 ----------
// 当用户在构建器里点击"生成"时调用
function pfBuildPromptFromGuideState(category, selections, rawInput) {
    const config = K_SCENARIO_GUIDE_STEPS[category];
    if (!config) return rawInput;
    const parts = [];
    // 保留用户原始输入当"主体/主题"
    if (rawInput && rawInput.trim()) parts.push(rawInput.trim());
    config.steps.forEach(step => {
        const sel = selections[step.id];
        if (sel && sel.trim()) {
            // 使用用户选择的 tags（已在前端拼装成逗号字符串）
            parts.push(sel.trim());
        }
    });
    return parts.filter(p => p && p.trim()).join('，').replace(/，\s*，/g, '，');
}

// ---------- 5.6 AI 模式：多方案一键生成（用于紫色浮层）----------
// 只在有 API Key 时调用，模拟豆包 API 的多方案输出
function pfBuildAIVariations(rawInput, category) {
    const config = K_SCENARIO_GUIDE_STEPS[category] || K_SCENARIO_GUIDE_STEPS.image;
    // 为 AI 绘画提供 3 套不同风格的预填方案
    // 其他场景提供 3 套不同语气/结构的方案
    let templates = [];
    if (category === 'image') {
        templates = [
            {
                name: '电影感方案',
                emoji: '🎬',
                subject: rawInput || 'beautiful young woman, elegant pose',
                style: 'cinematic, film grain, moody atmosphere, 35mm film',
                lighting: 'golden hour lighting, soft shadows, volumetric light',
                composition: 'close-up shot, shallow depth of field, bokeh background',
                quality: '8K resolution, highly detailed, masterpiece, professional photography'
            },
            {
                name: '日系动漫风',
                emoji: '🌸',
                subject: rawInput || 'anime girl, flowing hair, beautiful eyes',
                style: 'anime style, Japanese animation, vibrant colors, clean line art',
                lighting: 'soft anime lighting, celestial glow, vibrant colors',
                composition: 'portrait orientation, centered composition, dynamic angle',
                quality: 'best quality, masterpiece, absurdres, anime illustration'
            },
            {
                name: '极简黑白',
                emoji: '⚫',
                subject: rawInput || 'minimalist portrait, elegant simplicity',
                style: 'minimalist, black and white, monochrome, high contrast',
                lighting: 'dramatic chiaroscuro, studio lighting, hard shadows',
                composition: 'centered composition, negative space, clean lines',
                quality: '4K, sharp focus, professional artwork, gallery quality'
            }
        ];
    } else if (category === 'xiaohongshu') {
        templates = [
            { name: '爆款种草文', emoji: '🔥', title_style: '数字型标题，效果承诺，具体可量化', content_structure: '故事开头 + 中段干货 + 结尾金句', opening_hook: '数字冲击式开头', ending_call: '提问互动 + 引导三连', tone: '真诚闺蜜' },
            { name: '温柔日记风', emoji: '🌿', title_style: '情感共鸣型标题', content_structure: '日记体验流，真实感受', opening_hook: '场景代入式开头', ending_call: '金句引言 + 总结', tone: '文艺深情' },
            { name: '客观测评文', emoji: '📊', title_style: '对比测评型标题', content_structure: '测评对比文，优缺点对比', opening_hook: '直接点题', ending_call: '购买建议 + 提问', tone: '理性客观' }
        ];
    } else if (category === 'video') {
        templates = [
            { name: '抖音快节奏', emoji: '⚡', platform: '抖音 30 秒', duration: '30 秒 · 标准短视频', opening: '视觉冲击钩子', content_flow: '1-2-3 清单', bgm: '电子节拍卡点', ending: '三连引导' },
            { name: 'B 站深度', emoji: '📚', platform: 'B站 5 分钟', duration: '5-10 分钟 · 长视频', opening: '问题钩子', content_flow: '问题-解决方案', bgm: '钢琴抒情', ending: '评论区互动' },
            { name: '小红书 Vlog', emoji: '🌸', platform: '小红书视频', duration: '60 秒 · 完整叙事', opening: '画面 + 金句', content_flow: '故事叙述', bgm: '轻快流行', ending: '金句升华' }
        ];
    } else if (category === 'code') {
        templates = [
            { name: 'Python 脚本派', emoji: '🐍', language: 'Python', task_type: '完整小脚本', input_output: '文件读取 → 文件写入', complexity: '简单 MVP', style: '函数式简洁' },
            { name: 'TypeScript 工程派', emoji: '🔷', language: 'JavaScript / TypeScript', task_type: '完整小脚本', input_output: 'HTTP 请求 → JSON 响应', complexity: '工程化', style: '类型严谨' },
            { name: 'Go 高性能派', emoji: '🚀', language: 'Go / Rust', task_type: 'Web API / 接口', input_output: '数据库 → 结构化数据', complexity: '生产级', style: '异步优先' }
        ];
    } else {
        // writing 兜底
        templates = [
            { name: '正式专业版', emoji: '💼', type: '工作汇报/总结', audience: '领导/上级', purpose: '说明/告知', length: '标准 300-800 字', tone: '正式专业' },
            { name: '真诚亲切版', emoji: '💚', type: '文章/专栏', audience: '大众读者', purpose: '表达/分享', length: '详细 800-2000 字', tone: '友好亲切' },
            { name: '简洁高效版', emoji: '⚡', type: '正式邮件', audience: '同事/团队', purpose: '说明/告知', length: '简短 100-300 字', tone: '简洁高效' }
        ];
    }

    return {
        category,
        rawInput,
        templates: templates.map((t, i) => ({
            index: i + 1,
            ...t
        }))
    };
}

// ---------- 5.7 反向提纯场景的关键词推荐 ----------
// 根据用户选择的主题，返回相关中文关键词（用于反向提纯页面的多选面板）
function pfGetReverseKeywords(themeKey) {
    const preset = K_PRESETS[themeKey] || K_PRESETS.anime_illustration;
    const all = [];
    if (preset.styles) all.push(...preset.styles.slice(0, 8));
    if (preset.scenes) all.push(...preset.scenes.slice(0, 5));
    if (preset.lighting) all.push(...preset.lighting.slice(0, 5));
    if (preset.composition) all.push(...preset.composition.slice(0, 5));
    if (preset.quality) all.push(...preset.quality.slice(0, 5));
    return all;
}

// ---------- 5.8 对外导出（便于调试）----------
const PF_SMART_CATEGORIES = Object.fromEntries(
    Object.entries(K_CATEGORY_KEYWORDS).map(([k, v]) => [k, { name: v.name, emoji: v.emoji }])
);
