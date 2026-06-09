'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Sparkles } from 'lucide-react';
import type { Prompt } from '@/types/prompt';

interface PromptCardProps {
  prompt: Prompt;
  index: number;
}

export default function PromptCard({ prompt, index }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="glass-effect rounded-2xl p-6 border border-gray-100 hover:shadow-glow-sm transition-all duration-300 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/50 to-purple-100/50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-xs font-medium text-purple-600 uppercase tracking-wider">
                {prompt.category}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
              {prompt.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {prompt.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {prompt.tags.slice(0, 4).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-100 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-colors"
            >
              #{tag}
            </span>
          ))}
          {prompt.tags.length > 4 && (
            <span className="px-3 py-1 bg-gray-50 text-gray-400 text-xs font-medium rounded-full border border-gray-100">
              +{prompt.tags.length - 4}
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-purple-500 text-white text-sm font-medium rounded-xl hover:shadow-glow-sm hover:scale-105 transition-all duration-200"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>已复制</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>一键复制</span>
              </>
            )}
          </button>
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="px-4 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
          >
            {showDetail ? '收起' : '详情'}
          </button>
        </div>

        {showDetail && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-100"
          >
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-2 font-medium">提示词内容</p>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                {prompt.content}
              </pre>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
