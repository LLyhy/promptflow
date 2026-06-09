export interface KeywordCategory {
  name: string;
  icon: string;
  keywords: string[];
}

export const keywordDatabase: KeywordCategory[] = [
  {
    name: '艺术风格',
    icon: '🎨',
    keywords: [
      'digital painting', 'anime style', 'realistic', 'photorealistic', 'cel shading',
      'watercolor', 'oil painting', 'studio ghibli', 'pixar style', 'disney style',
      'cyberpunk', 'steampunk', 'fantasy art', 'sci-fi', 'concept art',
      'minimalist', 'vintage', 'retro', 'art nouveau', 'art deco',
      'impressionism', 'surrealism', 'pop art', 'low poly', 'isometric',
      'chibi', 'comic book style', 'manga style', 'ukiyoe', 'chinese style',
      'japanese style', 'korean style', 'western comics', 'cartoon style',
      '3d render', 'unreal engine', 'octane render', 'blender', 'zbrush'
    ]
  },
  {
    name: '主体人物',
    icon: '👤',
    keywords: [
      'beautiful girl', 'handsome man', 'young woman', 'mature woman', 'cute boy',
      'long hair', 'short hair', 'curly hair', 'straight hair', 'silver hair',
      'blonde hair', 'black hair', 'brown hair', 'red hair', 'blue hair',
      'pink hair', 'green hair', 'purple hair', 'ponytail', 'braids',
      'blue eyes', 'green eyes', 'brown eyes', 'purple eyes', 'red eyes',
      'golden eyes', 'smiling', 'serious expression', 'crying', 'laughing',
      'winking', 'blushing', 'seductive look', 'innocent look', 'thoughtful',
      'wearing dress', 'wearing suit', 'wearing kimono', 'wearing armor',
      'wearing casual clothes', 'wearing school uniform', 'wearing wedding dress',
      'full body portrait', 'upper body', 'close-up portrait', 'profile view',
      'looking at viewer', 'looking away', 'dynamic pose', 'standing', 'sitting',
      'lying down', 'jumping', 'dancing', 'fighting stance', 'peaceful pose'
    ]
  },
  {
    name: '场景背景',
    icon: '🌅',
    keywords: [
      'forest', 'mountain', 'beach', 'cityscape', 'village',
      'castle', 'temple', 'ancient ruins', 'future city', 'cyber city',
      'space station', 'alien planet', 'fantasy landscape', 'garden', 'park',
      'school', 'library', 'cafe', 'room interior', 'studio',
      'cherry blossoms', 'autumn leaves', 'winter snow', 'spring flowers', 'summer green',
      'sunset', 'sunrise', 'night sky', 'daytime', 'golden hour',
      'blue hour', 'rainy day', 'snowing', 'foggy', 'cloudy sky',
      'starry sky', 'moonlight', 'aurora', 'milky way', 'sunbeams',
      'bokeh background', 'shallow depth of field', 'detailed background',
      'simple background', 'gradient background', 'white background', 'black background'
    ]
  },
  {
    name: '氛围情绪',
    icon: '✨',
    keywords: [
      'dreamy', 'romantic', 'peaceful', 'serene', 'melancholic',
      'happy', 'joyful', 'exciting', 'dramatic', 'intense',
      'mysterious', 'magical', 'whimsical', 'cute', 'adorable',
      'epic', 'majestic', 'elegant', 'graceful', 'powerful',
      'nostalgic', 'warm atmosphere', 'cool atmosphere', 'cozy', 'comfortable',
      'spooky', 'eerie', 'horror', 'dark fantasy', 'grimdark',
      'hopeful', 'inspiring', 'motivational', 'calm', 'relaxing',
      'vibrant', 'cheerful', 'playful', 'funny', 'humorous'
    ]
  },
  {
    name: '光影色彩',
    icon: '💡',
    keywords: [
      'soft lighting', 'dramatic lighting', 'rim lighting', 'backlighting',
      'volumetric lighting', 'god rays', 'ambient occlusion', 'global illumination',
      'warm tones', 'cool tones', 'vibrant colors', 'pastel colors',
      'monochrome', 'black and white', 'high contrast', 'low contrast',
      'neon lights', 'led lights', 'bioluminescent', 'glowing effects',
      'lens flare', 'bloom effect', 'chromatic aberration', 'film grain',
      'cinematic lighting', 'studio lighting', 'natural light', 'sunlight',
      'moonlight', 'firelight', 'candlelight', 'street lights'
    ]
  },
  {
    name: '画质技术',
    icon: '📸',
    keywords: [
      'masterpiece', 'best quality', 'high quality', 'ultra-detailed', 'intricate details',
      '8k resolution', '4k', 'high resolution', 'absurdres', 'hyper detailed',
      'trending on artstation', 'trending on pixiv', 'award-winning',
      'professional artwork', 'official art', 'game cg', 'anime screenshot',
      'realistic', 'photo-realistic', 'lifelike', 'high fidelity',
      'sharp focus', 'soft focus', 'depth of field', 'blurry background',
      'vfx', 'special effects', 'particle effects', 'motion blur',
      'cinematic composition', 'rule of thirds', 'centered composition',
      'wide angle', 'telephoto', 'fisheye', 'portrait orientation',
      'landscape orientation', 'square format'
    ]
  },
  {
    name: '材质质感',
    icon: '🎭',
    keywords: [
      'smooth skin', 'porcelain skin', 'pale skin', 'tan skin',
      'silky hair', 'shiny hair', 'textured hair',
      'silk fabric', 'velvet', 'leather', 'denim',
      'metal armor', 'golden details', 'silver accents', 'jewelry',
      'glowing magic', 'energy effects', 'sparkles', 'glitter',
      'water droplets', 'sweat', 'tears', 'rain',
      'fire effects', 'ice effects', 'lightning', 'explosions',
      'dust particles', 'lens dust', 'smoke', 'mist',
      'glass reflections', 'mirror', 'water surface', 'reflections'
    ]
  },
  {
    name: '动物生物',
    icon: '🐾',
    keywords: [
      'cat', 'dog', 'rabbit', 'fox', 'wolf',
      'dragon', 'unicorn', 'phoenix', 'fairy', 'angel',
      'demon', 'vampire', 'elf', 'orc', 'troll',
      'robot', 'android', 'cyborg', 'mecha', 'alien',
      'bird', 'eagle', 'owl', 'butterfly', 'deer',
      'horse', 'lion', 'tiger', 'bear', 'panda',
      'mythical creature', 'fantasy beast', 'pet', 'companion animal'
    ]
  }
];

export const getRandomKeywords = (count: number = 15): string[] => {
  const allKeywords = keywordDatabase.flatMap(cat => cat.keywords);
  const shuffled = [...allKeywords].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getKeywordsByCategory = (category: string): string[] => {
  const cat = keywordDatabase.find(c => c.name === category);
  return cat ? cat.keywords : [];
};
