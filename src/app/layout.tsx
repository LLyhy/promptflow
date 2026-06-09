export const metadata = {
  title: 'PromptFlow | AI 提示词宝库',
  description: '精选优质 AI 提示词库',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
