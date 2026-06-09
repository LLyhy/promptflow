// ============================================================
// PromptFlow 统一关键词库 v2.0
// 三个页面共享：index.html / reverse.html / m/index.html
// ============================================================

// ---------- 通用关键词（按维度分类）----------
const K_STYLE = {
    'photorealistic': ['photorealistic', 'ultra realistic', 'hyperrealistic', 'realistic photography', 'lifelike', 'true to life', 'natural lighting', 'DSLR photo', 'RAW photo', 'sharp focus', 'intricate details', 'textured skin', 'skin pores'],
    'anime': ['anime style', 'Japanese animation', 'clean line art', 'vibrant colors', 'cel shading', 'studio ghibli inspired', 'anime screenshot', 'manga style', 'beautiful illustration', 'soft shading', 'glowing eyes'],
    'digital_art': ['digital painting', 'digital art', 'concept art', 'artstation trending', 'deviantart', 'digital illustration', 'painterly style', 'brush stroke texture', 'matte finish'],
    'oil_painting': ['oil painting', 'classical art', 'impasto texture', 'Rembrandt lighting', 'fine art', 'renaissance style', 'baroque', 'romanticism', 'art gallery quality'],
    'watercolor': ['watercolor painting', 'soft colors', 'wash technique', 'ink wash', 'paper texture', 'flowing colors', 'delicate brushwork'],
    'cyberpunk': ['cyberpunk', 'neon lights', 'futuristic city', 'holographic displays', 'rainy street', 'high contrast', 'dark atmosphere', 'sci-fi', 'chrome and glass', 'neon reflections', 'dystopian'],
    'chinese_ink': ['Chinese ink painting', 'traditional art', 'sumie style', 'ink wash', 'zen atmosphere', 'minimalist composition', 'scroll painting', 'oriental art', '禅意'],
    '3d_render': ['3D render', 'octane render', 'unreal engine', 'cinema 4D', 'volumetric lighting', 'ray tracing', 'Pixar style', 'studio quality', 'isometric view'],
    'portrait': ['portrait photography', 'studio portrait', 'beautiful face', 'soft skin', 'gorgeous eyes', 'elegant pose', 'editorial style', 'fashion photography'],
    'minimalist': ['minimalist', 'clean composition', 'simple background', 'negative space', 'modern aesthetic', 'geometric shapes', 'sleek design']
};

const K_LIGHTING = [
    'golden hour lighting', 'soft daylight', 'dramatic chiaroscuro', 'volumetric light',
    'god rays', 'rim lighting', 'backlighting', 'studio lighting', 'three-point lighting',
    'neon glow', 'candlelight', 'moonlight', 'sunbeams through leaves',
    'cinematic lighting', 'blue hour', 'sunset backlight', 'diffused light',
    'bokeh highlights', 'high contrast', 'warm tones', 'cool tones',
    'LED panel lights', 'softbox lighting', 'natural window light'
];

const K_COMPOSITION = [
    'rule of thirds', 'balanced composition', 'centered composition',
    'close-up shot', 'full body shot', 'upper body', 'portrait orientation',
    'wide angle', 'telephoto compression', 'low angle shot', 'top-down view',
    'bird eye view', 'dynamic angle', 'Dutch angle', 'symmetrical',
    'shallow depth of field', 'bokeh background', 'environmental portrait',
    'negative space', 'leading lines', 'golden ratio', 'framed by nature'
];

const K_QUALITY = [
    'masterpiece', 'best quality', 'ultra detailed', 'high resolution',
    '8K resolution', '4K', 'absurdres', 'hyper detailed', 'intricate details',
    'sharp focus', 'professional artwork', 'award winning', 'trending on artstation',
    'official art', 'cinematic', 'high fidelity', 'crisp details',
    'perfect anatomy', 'beautiful composition', 'exquisite rendering'
];

const K_NEGATIVE = [
    'low quality', 'worst quality', 'bad anatomy', 'blurry', 'jpeg artifacts',
    'deformed', 'ugly', 'mutated', 'extra fingers', 'missing fingers',
    'watermark', 'text', 'signature', 'logo', 'cropped', 'out of frame',
    'poorly drawn face', 'distorted', 'grainy', 'overexposed', 'underexposed',
    'cartoon', 'cgi', 'plastic skin', 'uncanny valley', 'asymmetric face'
];

// ---------- 8 个预设场景（每个场景精心调配）----------
const K_PRESETS = {
    'portrait_real': {
        name: '人像写真',
        emoji: '📸',
        subjects: [
            'beautiful young woman, elegant pose',
            'handsome man, confident expression',
            'portrait of a person, smiling gently',
            'close-up face, thoughtful expression',
            'editorial fashion portrait'
        ],
        styles: K_STYLE.photorealistic,
        scenes: ['indoor studio', 'outdoor urban background', 'natural environment', 'simple studio backdrop', 'gradient background'],
        lighting: K_LIGHTING,
        composition: K_COMPOSITION.slice(0, 12),
        quality: K_QUALITY,
        negative: K_NEGATIVE
    },
    'anime_illustration': {
        name: '动漫插画',
        emoji: '🎌',
        subjects: [
            'anime girl with long flowing hair',
            'anime character portrait, beautiful eyes',
            'chibi style cute character',
            'fantasy anime hero, dynamic pose',
            'anime school girl, cherry blossoms'
        ],
        styles: K_STYLE.anime,
        scenes: ['school campus', 'fantasy landscape', 'modern city', 'magical forest', 'starry night sky'],
        lighting: ['soft anime lighting', 'celestial glow', 'vibrant colors', 'sparkling effects', 'dramatic backlight'].concat(K_LIGHTING.slice(0, 8)),
        composition: K_COMPOSITION,
        quality: K_QUALITY,
        negative: K_NEGATIVE
    },
    'cyberpunk_city': {
        name: '赛博朋克',
        emoji: '🌃',
        subjects: [
            'cyberpunk girl with neon implants',
            'futuristic street scene',
            'neon-lit alley in Tokyo',
            'holographic advertisements',
            'cybernetic human, rain-soaked'
        ],
        styles: K_STYLE.cyberpunk,
        scenes: ['futuristic cityscape', 'rainy neon street', 'inside a spaceship', 'high tech lab', 'underground club'],
        lighting: ['neon lights reflection', 'holographic glow', 'cyberpunk lighting', 'chromatic aberration'].concat(K_LIGHTING.slice(0, 10)),
        composition: K_COMPOSITION,
        quality: K_QUALITY,
        negative: K_NEGATIVE
    },
    'landscape_photo': {
        name: '风景摄影',
        emoji: '🏞️',
        subjects: [
            'majestic mountain range',
            'serene lake with reflections',
            'dramatic coastline and waves',
            'ancient forest with sunbeams',
            'endless fields and blue sky'
        ],
        styles: K_STYLE.photorealistic.slice(0, 8).concat(['landscape photography', 'national geographic style']),
        scenes: ['mountain peak', 'pristine lake', 'deep forest', 'ocean shore', 'rolling hills', 'arid desert', 'autumn forest'],
        lighting: ['golden hour', 'sunset glow', 'blue hour', 'dramatic storm light', 'soft morning mist'].concat(K_LIGHTING.slice(0, 8)),
        composition: K_COMPOSITION.slice(5),
        quality: K_QUALITY,
        negative: K_NEGATIVE
    },
    'product_photo': {
        name: '产品摄影',
        emoji: '📦',
        subjects: [
            'elegant product on white background',
            'minimalist commercial product shot',
            'cosmetic product display',
            'high tech gadget showcase',
            'jewelry product shot'
        ],
        styles: K_STYLE.photorealistic.concat(['product photography', 'commercial shot', 'e-commerce photo']),
        scenes: ['clean white background', 'minimalist studio', 'marble surface', 'natural stone backdrop', 'gradient studio background'],
        lighting: ['studio softbox', 'ring light reflection', 'professional product lighting', 'even illumination', 'subtle shadow under product'],
        composition: ['centered composition', 'product close-up', 'flat lay', 'angled product view', 'minimalist arrangement'],
        quality: K_QUALITY,
        negative: K_NEGATIVE
    },
    'oil_painting_art': {
        name: '油画艺术',
        emoji: '🖼️',
        subjects: [
            'renaissance style portrait',
            'impressionist garden scene',
            'classical oil painting of a figure',
            'still life with fruits and wine',
            'baroque dramatic scene'
        ],
        styles: K_STYLE.oil_painting,
        scenes: ['classical interior', 'natural landscape background', 'dark studio backdrop', 'period room setting', 'Italian renaissance garden'],
        lighting: ['Rembrandt lighting', 'chiaroscuro', 'warm window light', 'dramatic contrast', 'single light source'],
        composition: K_COMPOSITION.slice(0, 10),
        quality: ['fine art', 'museum quality', 'masterpiece', 'oil on canvas', 'brushwork visible', 'exquisite rendering'],
        negative: K_NEGATIVE
    },
    'architecture_city': {
        name: '建筑城市',
        emoji: '🏛️',
        subjects: [
            'modern glass skyscraper',
            'ancient temple in sunlight',
            'symmetrical architecture',
            'European old town street',
            'futuristic bridge design'
        ],
        styles: ['architectural photography', 'geometric symmetry', 'clean lines'].concat(K_STYLE.photorealistic.slice(0, 8)),
        scenes: ['city street', 'historic district', 'modern plaza', 'towering skyscraper', 'classical building facade'],
        lighting: K_LIGHTING.slice(0, 12),
        composition: ['symmetrical composition', 'leading lines', 'low angle shot', 'wide angle perspective', 'facade detail shot', 'geometric pattern'],
        quality: K_QUALITY,
        negative: K_NEGATIVE
    },
    'animal_creature': {
        name: '动物生物',
        emoji: '🐾',
        subjects: [
            'majestic wolf in forest',
            'cute cat with soft fur',
            'colorful tropical bird',
            'fantasy dragon, mythical',
            'wildlife photography, deer'
        ],
        styles: K_STYLE.photorealistic.slice(0, 10).concat(['wildlife photography', 'animal portrait']),
        scenes: ['natural habitat', 'forest undergrowth', 'open savanna', 'ocean underwater', 'perched on branch'],
        lighting: K_LIGHTING.slice(0, 12),
        composition: ['close-up wildlife shot', 'animal in environment', 'shallow depth of field animal', 'action wildlife capture'],
        quality: K_QUALITY,
        negative: K_NEGATIVE
    }
};

// ---------- 通用关键词回退（当无法识别主题时使用）----------
const K_GENERAL_SUBJECTS = [
    'beautiful scene', 'stunning composition', 'aesthetic moment',
    'artistic representation', 'creative vision', 'visual masterpiece'
];

// ---------- 根据用户输入智能识别主题 ----------
function pfDetectTheme(input) {
    const text = input.toLowerCase();
    const chinese = input;

    if (text.includes('anime') || text.includes('manga') || chinese.includes('动漫') || chinese.includes('插画') || chinese.includes('二次元')) return 'anime_illustration';
    if (text.includes('cyber') || text.includes('neon') || text.includes('future') || chinese.includes('赛博') || chinese.includes('未来')) return 'cyberpunk_city';
    if (chinese.includes('人像') || chinese.includes('写真') || chinese.includes('人物') || chinese.includes('肖像')) return 'portrait_real';
    if (chinese.includes('风景') || chinese.includes('山水') || chinese.includes('自然') || text.includes('landscape') || text.includes('nature')) return 'landscape_photo';
    if (chinese.includes('产品') || chinese.includes('商品') || text.includes('product')) return 'product_photo';
    if (chinese.includes('油画') || chinese.includes('古典') || text.includes('oil painting') || text.includes('renaissance')) return 'oil_painting_art';
    if (chinese.includes('建筑') || chinese.includes('城市') || text.includes('architecture') || text.includes('building')) return 'architecture_city';
    if (chinese.includes('动物') || chinese.includes('猫') || chinese.includes('狗') || text.includes('animal') || text.includes('cat') || text.includes('dog')) return 'animal_creature';
    if (text.includes('portrait') || text.includes('girl') || text.includes('woman') || text.includes('man') || chinese.includes('女孩') || chinese.includes('美女')) return 'portrait_real';

    return 'anime_illustration'; // 默认最受欢迎风格
}

// ---------- 随机抽取工具 ----------
function pfPickRandom(arr, n) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(n, arr.length));
}

// ---------- 不同模型的输出格式化 ----------
function pfFormatMidjourney(tags, negativeTags, aspectRatio = '16:9', stylize = 250) {
    const positive = tags.join(', ');
    const negStr = negativeTags.slice(0, 8).join(', ');
    return `${positive}\n\n--no ${negStr} --ar ${aspectRatio} --stylize ${stylize} --v 6.0`;
}

function pfFormatSD(tags, negativeTags) {
    const positive = tags.join(', ');
    const neg = negativeTags.join(', ');
    return `【正向提示词】\n${positive}\n\n【负向提示词】\n${neg}`;
}

function pfFormatDALLE(tags) {
    // 自然语言长句：适合 DALL·E / 豆包文生图
    const subject = tags[0] || '';
    const style = tags.slice(1, 4).join(', ');
    const lighting = tags.slice(4, 7).join(', ');
    const quality = tags.slice(7, 10).join(', ');
    return `${subject}, ${style}. ${lighting}. ${quality}. Highly detailed, beautiful composition, professional quality.`;
}

function pfFormatPlain(tags) {
    return tags.join(', ');
}

// ---------- 核心：智能生成提示词 ----------
function pfGenerateSmart(input, modelType = 'plain') {
    const theme = pfDetectTheme(input);
    const preset = K_PRESETS[theme];

    const subject = pfPickRandom(preset.subjects, 1)[0];
    const style = pfPickRandom(preset.styles, 3);
    const scene = pfPickRandom(preset.scenes, 2);
    const lighting = pfPickRandom(preset.lighting, 2);
    const composition = pfPickRandom(preset.composition, 1);
    const quality = pfPickRandom(preset.quality, 3);

    const allTags = [subject, ...style, ...scene, ...lighting, ...composition, ...quality];
    const plainTags = allTags.filter(t => t && t.trim());

    // 根据模型类型格式化
    let formatted;
    switch (modelType) {
        case 'midjourney':
            formatted = pfFormatMidjourney(plainTags, K_NEGATIVE, '16:9', 250);
            break;
        case 'sd':
            formatted = pfFormatSD(plainTags, K_NEGATIVE);
            break;
        case 'dalle':
            formatted = pfFormatDALLE(plainTags);
            break;
        case 'plain':
        default:
            formatted = pfFormatPlain(plainTags);
    }

    return {
        theme: preset.name,
        themeEmoji: preset.emoji,
        subject,
        tags: plainTags,
        negative: K_NEGATIVE.slice(0, 10),
        formatted,
        plain: plainTags.join(', '),
        // 多格式预览
        midjourney: pfFormatMidjourney(plainTags, K_NEGATIVE, '16:9', 250),
        sd: pfFormatSD(plainTags, K_NEGATIVE),
        dalle: pfFormatDALLE(plainTags)
    };
}

// ---------- 图片提纯：基于用户勾选的主题生成关键词 ----------
function pfGenerateFromImage(themeKey = 'anime_illustration', customSubject = '') {
    const preset = K_PRESETS[themeKey] || K_PRESETS.anime_illustration;

    const subject = customSubject || pfPickRandom(preset.subjects, 1)[0];
    const style = pfPickRandom(preset.styles, 3);
    const scene = pfPickRandom(preset.scenes, 2);
    const lighting = pfPickRandom(preset.lighting, 2);
    const composition = pfPickRandom(preset.composition, 1);
    const quality = pfPickRandom(preset.quality, 3);

    const allTags = [subject, ...style, ...scene, ...lighting, ...composition, ...quality].filter(t => t && t.trim());

    return {
        theme: preset.name,
        themeEmoji: preset.emoji,
        tags: allTags,
        negative: K_NEGATIVE.slice(0, 10),
        plain: allTags.join(', '),
        midjourney: pfFormatMidjourney(allTags, K_NEGATIVE),
        sd: pfFormatSD(allTags, K_NEGATIVE),
        dalle: pfFormatDALLE(allTags),
        // 分类展示
        categorized: {
            '主体': [subject],
            '艺术风格': style,
            '场景': scene,
            '光线': lighting,
            '构图': composition,
            '画质': quality
        }
    };
}

// ---------- 主题预设列表（供 UI 展示）----------
const PF_PRESET_LIST = Object.entries(K_PRESETS).map(([key, val]) => ({
    key,
    name: val.name,
    emoji: val.emoji
}));

// ---------- 反向提纯专用：返回分好类的中英文关键词 ----------
function pfGenerateFromTheme(themeKey) {
    const preset = K_PRESETS[themeKey] || K_PRESETS.anime_illustration;
    const subject = pfPickRandom(preset.subjects, 1);
    const style = pfPickRandom(preset.styles, 3);
    const scene = pfPickRandom(preset.scenes, 2);
    const tech = pfPickRandom(preset.quality, 3);
    return {
        subject: subject,
        style: style,
        scene: scene,
        tech: tech,
        all: [...subject, ...style, ...scene, ...tech],
        theme: preset.name,
        themeEmoji: preset.emoji
    };
}

// ============================================================
// v3.0 新增：每日灵感卡片、提示词优化器、批量生成器
// ============================================================

// ---------- 每日灵感卡片（首页顶部展示用）----------
// 每个卡片：简短标题 + 描述 + 预设输入文字（用户点按钮后直接用这个当输入）
const K_INSPIRATION_CARDS = [
    {
        id: 'cyberpunk_01',
        title: '霓虹雨夜',
        emoji: '🌃',
        subtitle: '赛博朋克风格街景',
        sampleInput: '赛博朋克风格少女站在霓虹雨夜的东京街头，雨水反射着霓虹招牌',
        theme: 'cyberpunk_city',
        tag: '热门'
    },
    {
        id: 'anime_01',
        title: '吉卜力风少女',
        emoji: '🎌',
        subtitle: '动漫插画 · 治愈系',
        sampleInput: '吉卜力风格动漫少女站在樱花飘落的校园走廊，温柔的午后阳光',
        theme: 'anime_illustration',
        tag: '新手友好'
    },
    {
        id: 'portrait_01',
        title: '电影感人像',
        emoji: '📸',
        subtitle: '胶片质感写真',
        sampleInput: '电影级人像摄影，年轻女子在金色阳光下的窗边肖像，柯达 Portra 400 胶片质感',
        theme: 'portrait_real',
        tag: '新手友好'
    },
    {
        id: 'landscape_01',
        title: '山海日出',
        emoji: '🏞️',
        subtitle: '国家地理级风景',
        sampleInput: '壮丽山脉在日出时分，云海翻涌，金色阳光穿透云层照亮山谷',
        theme: 'landscape_photo',
        tag: '高质量'
    },
    {
        id: 'product_01',
        title: '极简产品照',
        emoji: '📦',
        subtitle: '电商出图神器',
        sampleInput: '极简风格化妆品产品摄影，大理石台面，柔和棚拍光，高端杂志商业感',
        theme: 'product_photo',
        tag: '商用'
    },
    {
        id: 'oil_01',
        title: '古典油画',
        emoji: '🖼️',
        subtitle: '伦勃朗光 · 艺术气息',
        sampleInput: '文艺复兴时期古典油画，一位少女的肖像，伦勃朗光，厚重油彩笔触',
        theme: 'oil_painting_art',
        tag: '艺术感'
    },
    {
        id: 'architecture_01',
        title: '对称建筑',
        emoji: '🏛️',
        subtitle: '几何美学 · 线条感',
        sampleInput: '现代玻璃摩天大楼的仰拍视角，对称构图，蓝天背景，几何线条',
        theme: 'architecture_city',
        tag: '极简'
    },
    {
        id: 'animal_01',
        title: '森林生灵',
        emoji: '🐾',
        subtitle: '野生动物摄影',
        sampleInput: '一只威严的狼在薄雾森林中，晨光穿透树叶形成丁达尔效应',
        theme: 'animal_creature',
        tag: '自然'
    },
    {
        id: 'cyberpunk_02',
        title: '未来都市',
        emoji: '🏙️',
        subtitle: '高概念科幻场景',
        sampleInput: '未来感悬浮车在超高摩天大楼之间穿梭，城市灯火通明，巨大全息广告',
        theme: 'cyberpunk_city',
        tag: '大场景'
    },
    {
        id: 'anime_02',
        title: '奇幻少年',
        emoji: '✨',
        subtitle: '热血动漫风',
        sampleInput: '热血动漫风格，少年剑士在魔法结界中战斗，能量爆发特效，动态构图',
        theme: 'anime_illustration',
        tag: '热血'
    },
    {
        id: 'portrait_02',
        title: '时尚大片',
        emoji: '👗',
        subtitle: 'Vogue 编辑风格',
        sampleInput: '时尚杂志大片，高级时装模特在极简白背景前，戏剧性棚拍光，编辑摄影风格',
        theme: 'portrait_real',
        tag: '高级'
    },
    {
        id: 'landscape_02',
        title: '星空银河',
        emoji: '🌌',
        subtitle: '夜景长曝光',
        sampleInput: '壮阔银河在雪山之上的夜空，长曝光星空摄影，点点繁星与极光',
        theme: 'landscape_photo',
        tag: '梦幻'
    }
];

// ---------- 提示词优化器 ----------
// 输入：一段简陋的用户提示词（中文大白话或不完整的英文）
// 输出：升级后的多维度专业提示词 + 标注"新增了哪些元素"
function pfRefinePrompt(rawInput, modelType = 'plain') {
    const cleanInput = rawInput.trim();
    if (!cleanInput) return null;

    // 步骤 1：识别主题（复用原有识别逻辑，保证一致）
    const theme = pfDetectTheme(cleanInput);
    const preset = K_PRESETS[theme];

    // 步骤 2：从用户输入提取"核心主体"（去除废话）
    let coreSubject = cleanInput;
    // 中文情况：保留用户描述的主体（不做英文强制替换）
    if (/[\u4e00-\u9fa5]/.test(cleanInput)) {
        // 中文主体 + 加上翻译后的英文关键词混合策略
        // 直接用用户输入当核心主体，再在外层补足
        coreSubject = cleanInput;
    }

    // 步骤 3：智能补足维度
    const addStyles = pfPickRandom(preset.styles, 3);
    const addScenes = pfPickRandom(preset.scenes, 2);
    const addLighting = pfPickRandom(preset.lighting, 2);
    const addComposition = pfPickRandom(preset.composition, 1);
    const addQuality = pfPickRandom(preset.quality, 3);

    // 组装：用户原始主体在前，补足关键词在后（专业提示词标准结构）
    const finalTags = [coreSubject, ...addStyles, ...addScenes, ...addLighting, ...addComposition, ...addQuality];
    const cleanTags = finalTags.filter(t => t && t.trim());

    // 按模型格式化
    let formatted;
    switch (modelType) {
        case 'midjourney':
            formatted = pfFormatMidjourney(cleanTags, K_NEGATIVE, '16:9', 250);
            break;
        case 'sd':
            formatted = pfFormatSD(cleanTags, K_NEGATIVE);
            break;
        case 'dalle':
            formatted = pfFormatDALLE(cleanTags);
            break;
        default:
            formatted = pfFormatPlain(cleanTags);
    }

    return {
        theme: preset.name,
        themeEmoji: preset.emoji,
        originalText: cleanInput,
        added: {
            '🎨 艺术风格': addStyles,
            '🌆 场景环境': addScenes,
            '💡 光线氛围': addLighting,
            '📐 构图视角': addComposition,
            '✨ 画质参数': addQuality
        },
        tags: cleanTags,
        negative: K_NEGATIVE.slice(0, 10),
        formatted,
        plain: cleanTags.join(', '),
        midjourney: pfFormatMidjourney(cleanTags, K_NEGATIVE, '16:9', 250),
        sd: pfFormatSD(cleanTags, K_NEGATIVE),
        dalle: pfFormatDALLE(cleanTags)
    };
}

// ---------- 批量生成器：一次性生成 N 个不同风格版本 ----------
const K_BATCH_VARIATIONS = [
    { key: 'cinematic', name: '🎬 电影感', styleHint: 'cinematic lighting, film grain, moody atmosphere' },
    { key: 'anime', name: '🎌 日系动漫', styleHint: 'anime style, vibrant colors, clean line art' },
    { key: 'oil', name: '🖼️ 油画艺术', styleHint: 'oil painting, classical art, impasto texture, Rembrandt lighting' },
    { key: 'minimal', name: '⚪ 极简主义', styleHint: 'minimalist, clean composition, negative space, simple background' },
    { key: 'noir', name: '🌑 黑白电影', styleHint: 'black and white, high contrast, film noir, dramatic shadows' },
    { key: 'neon', name: '🌈 霓虹赛博', styleHint: 'neon lights, cyberpunk, futuristic, high contrast, rain' },
    { key: 'watercolor', name: '🎨 水彩写意', styleHint: 'watercolor painting, soft colors, wash technique, paper texture' },
    { key: 'surreal', name: '🔮 超现实', styleHint: 'surrealism, dreamlike, Salvador Dali inspired, fantasy' }
];

function pfBatchGenerate(baseInput, modelType = 'plain') {
    const theme = pfDetectTheme(baseInput);
    const preset = K_PRESETS[theme];

    const results = K_BATCH_VARIATIONS.map(variation => {
        // 每个变体：用户主体 + 变体内置风格词 + 主题随机补足
        const extraStyles = pfPickRandom(preset.styles, 2);
        const addLighting = pfPickRandom(preset.lighting, 2);
        const addComposition = pfPickRandom(preset.composition, 1);
        const addQuality = pfPickRandom(preset.quality, 2);

        const tags = [
            baseInput,
            variation.styleHint,
            ...extraStyles,
            ...addLighting,
            ...addComposition,
            ...addQuality
        ].filter(t => t && t.trim());

        let formatted;
        switch (modelType) {
            case 'midjourney':
                formatted = pfFormatMidjourney(tags, K_NEGATIVE, '16:9', 250);
                break;
            case 'sd':
                formatted = pfFormatSD(tags, K_NEGATIVE);
                break;
            case 'dalle':
                formatted = pfFormatDALLE(tags);
                break;
            default:
                formatted = pfFormatPlain(tags);
        }

        return {
            variationKey: variation.key,
            variationName: variation.name,
            tags,
            formatted,
            plain: tags.join(', ')
        };
    });

    return {
        baseInput,
        theme: preset.name,
        themeEmoji: preset.emoji,
        variations: results
    };
}

// ---------- v4.0 中-英高频词映射（智能模式下做简单翻译）----------
// 策略：中文输入的"名词/形容词"直接替换为英文关键词，
// 未命中的词保留原文（因为可能是专有名词）。
const K_ZH_EN_DICT = {
    '少女': 'beautiful young woman', '女孩': 'girl', '男孩': 'boy', '男子': 'handsome man',
    '人像': 'portrait', '肖像': 'portrait', '写真': 'photorealistic portrait',
    '风景': 'landscape', '山': 'mountains', '山脉': 'mountain range', '森林': 'forest',
    '树': 'trees', '花': 'flowers', '花园': 'garden', '天空': 'sky', '云': 'clouds',
    '海洋': 'ocean', '海': 'ocean', '海滩': 'beach', '湖': 'lake', '河流': 'river',
    '城市': 'city', '街道': 'street', '建筑': 'architecture', '高楼': 'skyscrapers',
    '夜晚': 'at night', '夜景': 'night scene', '夜晚的': 'at night',
    '日落': 'sunset', '日出': 'sunrise', '黄昏': 'golden hour', '中午': 'midday',
    '雨': 'rain', '下雨': 'rainy weather', '雪': 'snow', '雪天': 'snowy',
    '电影感': 'cinematic', '电影级': 'cinematic lighting', '胶片': 'film grain',
    '油画': 'oil painting', '水彩': 'watercolor', '素描': 'pencil sketch',
    '动漫': 'anime style', '漫画': 'manga style', '二次元': 'anime illustration',
    '赛博朋克': 'cyberpunk', '科幻': 'sci-fi', '未来': 'futuristic',
    '极简': 'minimalist', '极简主义': 'minimalism', '超现实': 'surrealism',
    '可爱': 'cute', '美丽': 'beautiful', '华丽': 'gorgeous', '优雅': 'elegant',
    '帅气': 'handsome', '酷': 'cool', '黑暗': 'dark', '神秘': 'mysterious',
    '梦幻': 'dreamy', '温柔': 'soft and gentle', '柔和': 'soft lighting',
    '霓虹': 'neon lights', '发光': 'glowing', '粒子': 'particles',
    '金色': 'golden tones', '银色': 'silver tones', '蓝色': 'blue color palette',
    '红色': 'red color palette', '绿色': 'green color palette',
    '特写': 'close-up shot', '全身': 'full body shot', '半身': 'half body shot',
    '远景': 'wide shot', '近景': 'close-up', '俯视': 'birds-eye view',
    '动物': 'animal', '猫': 'cat', '狗': 'dog', '鸟': 'bird', '龙': 'dragon',
    '车': 'car', '汽车': 'automobile', '飞机': 'airplane', '飞船': 'spaceship',
    '女人': 'woman', '男人': 'man', '儿童': 'child', '老人': 'elderly person',
    '室内': 'indoor', '室外': 'outdoor', '工作室': 'studio',
    '背景': 'background', '前景': 'foreground', '中心': 'centered composition',
    '高清': 'high resolution', '4k': '4K, ultra HD', '8k': '8K resolution',
    '精美': 'highly detailed', '精致': 'intricate details', '细节': 'fine details',
    '光影': 'dramatic lighting', '逆光': 'backlit', '柔光': 'soft light',
    '高光': 'rim light', '阴影': 'soft shadows', '反射': 'reflections',
    '构图': 'composition', '对称': 'symmetrical', '三分法': 'rule of thirds',
    '动态': 'dynamic pose', '静态': 'static composition',
    '艺术': 'artistic', '概念': 'concept art', '插画': 'illustration',
    '渲染': '3D render', '照片': 'photograph', '摄影': 'photography',
    '真实': 'photorealistic', '写实': 'realistic', '逼真': 'hyperrealistic'
};

// 中文输入 → 英文输出（简单但够用的翻译）
function pfTranslateChinese(input) {
    if (!input) return '';
    // 纯英文输入直接返回
    if (!/[\u4e00-\u9fa5]/.test(input)) return input;
    let result = input;
    // 按"键长"排序，避免短词先匹配（比如"海"先于"海洋"）
    const keys = Object.keys(K_ZH_EN_DICT).sort((a, b) => b.length - a.length);
    keys.forEach(zh => {
        result = result.split(zh).join(K_ZH_EN_DICT[zh]);
    });
    // 清理中文标点为英文逗号
    result = result.replace(/[，。！？、]/g, ', ').replace(/\s+/g, ' ').trim();
    result = result.replace(/(,\s*){2,}/g, ', ');
    if (result.endsWith(', ')) result = result.slice(0, -2);
    return result;
}

// 中文描述词（中文模式下替代英文关键词）
const K_ZH_DESCRIPTIVE = [
    '精致的细节', '柔和的光线', '电影级的构图', '高分辨率', '精美的色彩',
    '自然的氛围', '动人的画面', '清晰的边缘', '细腻的笔触', '完美的构图',
    '电影级光影', '细腻的纹理', '温暖的色调', '冷色调', '大师级作品'
];

// ---------- v4.0 主入口：带语言模式的智能生成 ----------
// langMode: 'mix'（默认·中文描述 + 英文关键词） | 'en'（全英文输出） | 'zh'（全中文输出）
function pfGenerateSmartV4(input, options) {
    options = options || {};
    const modelType = options.modelType || 'plain';
    const langMode = options.langMode || 'mix';
    const theme = pfDetectTheme(input);
    const preset = K_PRESETS[theme];

    let userSubject;
    if (langMode === 'en') {
        userSubject = pfTranslateChinese(input);
    } else if (langMode === 'zh') {
        userSubject = input;
    } else {
        userSubject = input; // mix：中文描述在前
    }

    const addStyles = pfPickRandom(preset.styles, 3);
    const addScenes = pfPickRandom(preset.scenes, 2);
    const addLighting = pfPickRandom(preset.lighting, 2);
    const addComposition = pfPickRandom(preset.composition, 1);
    const addQuality = pfPickRandom(preset.quality, 3);

    let finalTags;
    if (langMode === 'zh') {
        // 全中文：用户输入 + 中文描述词
        const zhQuality = pfPickRandom(K_ZH_DESCRIPTIVE, 5);
        finalTags = [
            userSubject,
            '【画面风格】' + preset.name,
            zhQuality.join('，')
        ];
    } else if (langMode === 'en') {
        // 全英文：翻译后的主体在前，然后英文关键词
        finalTags = [userSubject, ...addStyles, ...addScenes, ...addLighting, ...addComposition, ...addQuality];
    } else {
        // mix：中文用户描述 + 英文关键词（兼顾"看懂"和"AI 识别"）
        finalTags = [userSubject, ...addStyles, ...addScenes, ...addLighting, ...addComposition, ...addQuality];
    }

    const cleanTags = finalTags.filter(t => t && t.trim());
    let formatted;
    switch (modelType) {
        case 'midjourney': formatted = pfFormatMidjourney(cleanTags, K_NEGATIVE, '16:9', 250); break;
        case 'sd': formatted = pfFormatSD(cleanTags, K_NEGATIVE); break;
        case 'dalle': formatted = pfFormatDALLE(cleanTags); break;
        default: formatted = pfFormatPlain(cleanTags);
    }

    return {
        theme: preset.name,
        themeEmoji: preset.emoji,
        tags: cleanTags,
        plain: cleanTags.join(', '),
        formatted,
        midjourney: pfFormatMidjourney(cleanTags, K_NEGATIVE, '16:9', 250),
        sd: pfFormatSD(cleanTags, K_NEGATIVE),
        dalle: pfFormatDALLE(cleanTags)
    };
}

// ---------- 简易中文→英文关键词映射（用于英文用户）----------
const K_ZH_TO_EN_HINTS = {
    '少女': 'young woman',
    '女孩': 'girl',
    '男孩': 'boy',
    '男子': 'man',
    '风景': 'landscape',
    '城市': 'city',
    '街景': 'street scene',
    '夜景': 'night scene',
    '肖像': 'portrait',
    '动漫': 'anime style',
    '插画': 'illustration',
    '森林': 'forest',
    '海洋': 'ocean',
    '山脉': 'mountain',
    '天空': 'sky',
    '日落': 'sunset',
    '日出': 'sunrise',
    '雨': 'rain',
    '雪': 'snow',
    '花': 'flowers',
    '猫': 'cat',
    '狗': 'dog',
    '产品': 'product photography',
    '建筑': 'architecture',
    '油画': 'oil painting',
    '电影': 'cinematic',
    '梦幻': 'dreamy'
};
