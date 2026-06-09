export type PromptCategory = '通用写作' | '编程开发' | 'AI 绘画' | '学习教育' | '职场效率';

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: PromptCategory;
  tags: string[];
}
