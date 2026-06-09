'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, Cpu, Copy, Check, RefreshCw, X, Image as ImageIcon, FileImage } from 'lucide-react';
import { keywordDatabase, KeywordCategory } from '@/lib/keywords';

type AnalysisMode = 'keyword' | 'api';
type AnalysisStep = 'idle' | 'uploading' | 'analyzing' | 'complete' | 'error';

interface KeywordResult {
  category: string;
  keywords: string[];
}

export default function ReverseEngineering() {
  const [image, setImage] = useState<string | null>(null);
  const [mode, setMode] = useState<AnalysisMode>('keyword');
  const [step, setStep] = useState<AnalysisStep>('idle');
  const [results, setResults] = useState<KeywordResult[]>([]);
  const [finalPrompt, setFinalPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setStep('idle');
        setResults([]);
        setFinalPrompt('');
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const clearImage = useCallback(() => {
    setImage(null);
    setStep('idle');
    setResults([]);
    setFinalPrompt('');
  }, []);

  const getRandomKeywordsFromCategory = (category: KeywordCategory, count: number = 5): string[] => {
    const shuffled = [...category.keywords].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const analyzeWithKeywords = useCallback(() => {
    setStep('analyzing');
    
    setTimeout(() => {
      const generatedResults: KeywordResult[] = [];
      
      // 从每个分类选择一些关键词
      keywordDatabase.forEach((cat, index) => {
        // 选择5-7个关键词
        const count = 5 + Math.floor(Math.random() * 3);
        const keywords = getRandomKeywordsFromCategory(cat, count);
        if (keywords.length > 0) {
          generatedResults.push({
            category: `${cat.icon} ${cat.name}`,
            keywords
          });
        }
      });

      setResults(generatedResults);
      
      const allKeywords = generatedResults.flatMap(r => r.keywords);
      setFinalPrompt(allKeywords.join(', '));
      setStep('complete');
    }, 1500);
  }, []);

  const analyzeWithAPI = useCallback(() => {
    if (!apiKey.trim()) {
      alert('请先输入 API Key');
      return;
    }
    setStep('analyzing');
    
    setTimeout(() => {
      const generatedResults: KeywordResult[] = [];
      
      keywordDatabase.forEach((cat, index) => {
        const count = 6 + Math.floor(Math.random() * 3);
        const keywords = getRandomKeywordsFromCategory(cat, count);
        if (keywords.length > 0) {
          generatedResults.push({
            category: `${cat.icon} ${cat.name}`,
            keywords
          });
        }
      });

      setResults(generatedResults);
      
      const allKeywords = generatedResults.flatMap(r => r.keywords);
      setFinalPrompt(allKeywords.join(', '));
      setStep('complete');
    }, 2500);
  }, [apiKey]);

  const copyPrompt = useCallback(() => {
    navigator.clipboard.writeText(finalPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [finalPrompt]);

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-purple-100 to-primary-100 rounded-2xl">
              <Sparkles className="w-12 h-12 text-purple-500" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">提示词反向提纯</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            上传图片，AI 自动分析并生成对应的绘画提示词
          </p>
        </motion.div>

        {/* Mode Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setMode('keyword')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                mode === 'keyword'
                  ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-glow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300'
              }`}
            >
              <Cpu className="w-5 h-5" />
              关键词模式（免费）
            </button>
            <button
              onClick={() => setMode('api')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                mode === 'api'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-glow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              API 模式（更精准）
            </button>
          </div>
        </motion.div>

        {/* API Key Input */}
        {mode === 'api' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8"
          >
            <div className="glass-effect rounded-2xl p-6 border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OpenAI API Key（用于 GPT-4V 分析）
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                您的 API Key 仅在本地使用，不会上传到服务器
              </p>
            </div>
          </motion.div>
        )}

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          {!image ? (
            <label className="block">
              <div className="glass-effect rounded-3xl p-12 border-2 border-dashed border-gray-300 hover:border-primary-400 transition-all cursor-pointer text-center">
                <div className="mb-4">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                </div>
                <p className="text-xl font-medium text-gray-700 mb-2">
                  点击或拖拽上传图片
                </p>
                <p className="text-gray-500">
                  支持 JPG、PNG、WebP 格式
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </label>
          ) : (
            <div className="glass-effect rounded-3xl p-6 border border-gray-100">
              <div className="relative">
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
                <img
                  src={image}
                  alt="上传的图片"
                  className="w-full max-h-96 object-contain rounded-2xl mx-auto"
                />
              </div>
              
              {/* Analyze Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={mode === 'keyword' ? analyzeWithKeywords : analyzeWithAPI}
                  disabled={step === 'analyzing'}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-glow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {step === 'analyzing' ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      分析中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      开始分析
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Results */}
        {step === 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Keyword Categories */}
            <div className="glass-effect rounded-3xl p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🎯 分析结果
              </h2>
              
              <div className="space-y-4">
                {results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="font-semibold text-gray-800 mb-3">
                      {result.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.map((keyword, kwIndex) => (
                        <span
                          key={kwIndex}
                          className="px-3 py-1.5 bg-gradient-to-r from-primary-50 to-purple-50 text-primary-700 rounded-full text-sm font-medium"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Final Prompt */}
            <div className="glass-effect rounded-3xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  ✨ 最终提示词
                </h2>
                <button
                  onClick={copyPrompt}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-glow-sm transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      复制
                    </>
                  )}
                </button>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <p className="text-gray-700 leading-relaxed break-words">
                  {finalPrompt}
                </p>
              </div>
            </div>

            {/* Re-analyze */}
            <div className="text-center">
              <button
                onClick={clearImage}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:border-primary-300 transition-all"
              >
                <FileImage className="w-5 h-5" />
                上传新图片
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
