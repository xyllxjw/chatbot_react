const ChatbotIcon = () => {
  return (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="70" height="80">
     <defs>
       <linearGradient id="newGradient" x1="50%" y1="0%" x2="50%" y2="100%">
         <stop offset="0%" style={{ stopColor: "#60a5fa", stopOpacity: 0.8 }} />
         <stop offset="100%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }} />
       </linearGradient>
       <filter id="softShadow">
         <feDropShadow dx="4" dy="4" stdDeviation="8" floodColor="rgba(0,0,0,0.1)"/>
         <feGaussianBlur stdDeviation="4" result="shadow"/>
       </filter>
     </defs>

     {/* 拟人化四肢 */}
     <g stroke="#1e40af" strokeWidth="16" strokeLinecap="round">
       {/* 放大后的手臂 */}
       <path d="M192 480v-80l-128 80 128 80v-80m640 0v-80l128 80-128 80v-80" 
             fill="url(#newGradient)"/>
       {/* 放大后的腿部 */}
       <path d="M352 864v-128l-80 80 80 80v-48m320 0v-128l80 80-80 80v-48"
             fill="#3b82f6"/>
     </g>

     {/* 主体轮廓（更新了y坐标） */}
     <g filter="url(#softShadow)">
       <path 
         d="M736 320H288c-70.4 0-128 57.6-128 128v256c0 70.4 57.6 128 128 128h448c70.4 0 128-57.6 128-128V448c0-70.4-57.6-128-128-128z"
         fill="url(#newGradient)"
         rx="32"
         stroke="#1e40af"
         strokeWidth="16"
       />
     </g>

     {/* 调整后的手部细节 */}
     <g fill="#1e3a8a">
       <circle cx="96" cy="512" r="32"/>
       <circle cx="928" cy="512" r="32"/>
     </g>

     {/* 头部装饰 */}
     <path 
       d="M512 192c-35.2 0-64 28.8-64 64s28.8 64 64 64 64-28.8 64-64-28.8-64-64-64z"
       fill="#93c5fd"
     />

     {/* 动态屏幕 */}
     <g transform="translate(256 448)">
       {/* 对话气泡背景 */}
       <path 
         d="M0 0h512v192H0V0zm0 224h384v64H0v-64z"
         fill="#fff"
         rx="16"
       />
       
       {/* 动态波浪线 */}
       <path 
         d="M32 160q32 0 32 32-32 0-32 32 32-32 64-32 0 32 32 32-32 0-32 32"
         stroke="#3b82f6"
         strokeWidth="8"
         fill="none"
         strokeLinecap="round"
       />
     </g>

     {/* 拟人化眼睛（带高光） */}
     <g fill="#1e3a8a">
       <path d="M384 320a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm256 0a64 64 0 1 0 0-128 64 64 0 0 0 0 128z"/>
       <path d="M416 288a16 16 0 1 0 0-32 16 16 0 0 0 0 32zm192 0a16 16 0 1 0 0-32 16 16 0 0 0 0 32z" fill="#fff"/>
     </g>

     {/* 交互按钮 */}
     <circle cx="800" cy="640" r="32" fill="#10b981" stroke="#059669" strokeWidth="8"/>
   </svg>
  )
}

export default ChatbotIcon;