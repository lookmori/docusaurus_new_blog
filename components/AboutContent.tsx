'use client';

import { useEffect, useState } from 'react';

export default function AboutContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-8 gradient-text text-center">关于我</h1>

      <p className="mb-6 leading-relaxed text-lg text-gray-700 dark:text-gray-300">
        你好！欢迎来到我的个人博客。
      </p>

      <h2 className="text-3xl font-semibold mt-12 mb-6 text-gray-900 dark:text-gray-100">个人简介</h2>

      <p className="mb-6 leading-relaxed text-lg text-gray-700 dark:text-gray-300">
        我是一名热爱技术的开发者，专注于前端开发和全栈技术。在这里，我会分享我的学习心得、技术见解和生活感悟。
      </p>

      <h2 className="text-3xl font-semibold mt-12 mb-6 text-gray-900 dark:text-gray-100">技术栈</h2>

      <ul className="list-disc pl-6 mb-6 space-y-3">
        <li className="text-gray-700 dark:text-gray-300 pl-2">
          <strong>前端</strong>: React, Next.js, TypeScript, TailwindCSS
        </li>
        <li className="text-gray-700 dark:text-gray-300 pl-2">
          <strong>后端</strong>: Node.js, Python
        </li>
        <li className="text-gray-700 dark:text-gray-300 pl-2">
          <strong>数据库</strong>: PostgreSQL, MongoDB
        </li>
        <li className="text-gray-700 dark:text-gray-300 pl-2">
          <strong>工具</strong>: Git, Docker, VS Code
        </li>
      </ul>

      <h2 className="text-3xl font-semibold mt-12 mb-6 text-gray-900 dark:text-gray-100">兴趣爱好</h2>

      <ul className="list-disc pl-6 mb-6 space-y-3">
        <li className="text-gray-700 dark:text-gray-300 pl-2">
          🚀 探索新技术和框架
        </li>
        <li className="text-gray-700 dark:text-gray-300 pl-2">
          📚 阅读技术书籍和文档
        </li>
        <li className="text-gray-700 dark:text-gray-300 pl-2">
          ✍️ 写作和分享知识
        </li>
        <li className="text-gray-700 dark:text-gray-300 pl-2">
          🎵 听音乐和看电影
        </li>
      </ul>

      <h2 className="text-3xl font-semibold mt-12 mb-6 text-gray-900 dark:text-gray-100">联系方式</h2>

      <p className="mb-6 leading-relaxed text-lg text-gray-700 dark:text-gray-300">
        如果你想和我交流技术或者有任何问题，欢迎通过以下方式联系我：
      </p>

      <p className="mb-6 leading-relaxed text-lg text-gray-700 dark:text-gray-300">
        我的邮箱是：
        <a 
          href="mailto:lookmori@163.com" 
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium underline decoration-2 underline-offset-2 hover:decoration-blue-500 transition-colors ml-1"
        >
          lookmori@163.com
        </a>
      </p>

      <blockquote className="border-l-4 border-gradient-to-b from-blue-500 to-purple-500 pl-6 italic my-8 text-gray-600 dark:text-gray-400 text-lg glass-effect p-6 rounded-r-xl">
        感谢你的访问，希望我的文章对你有所帮助！
      </blockquote>
    </div>
  );
}