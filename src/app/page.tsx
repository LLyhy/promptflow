'use client'

export default function Home() {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '32px', 
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '32px', 
        fontWeight: 'bold', 
        color: '#000000', 
        margin: '0 0 16px 0' 
      }}>
        PromptFlow
      </h1>
      <p style={{ 
        fontSize: '18px', 
        color: '#4b5563', 
        margin: '0 0 8px 0' 
      }}>
        AI 提示词宝库
      </p>
      <p style={{ 
        fontSize: '16px', 
        color: '#6b7280', 
        margin: '0 0 24px 0' 
      }}>
        提示词反向提纯功能
      </p>
      <div style={{ 
        backgroundColor: '#f3f4f6', 
        padding: '16px', 
        borderRadius: '8px' 
      }}>
        <p style={{ fontSize: '14px', color: '#374151', margin: '0' }}>
          📝 功能说明：上传图片，自动生成对应的 AI 绘画提示词
        </p>
      </div>
    </div>
  )
}
