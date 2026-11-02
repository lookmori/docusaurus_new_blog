export default function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-400 relative z-10">
      <div className="space-y-1">
        <p>随心的随笔 · 个人博客</p>
        <p>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            豫ICP备2025114040号-1
          </a>
        </p>
      </div>
    </footer>
  )
}
