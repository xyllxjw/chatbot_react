import { useRef, useState, useEffect } from 'react';
import ChatbotIcon from './components/ChatbotIcon';
import ChatForm from './components/ChatForm';
import ChatMessage from './components/ChatMessage';
import { companyInfo } from './companyinfo';
const App = () => {
  const [chatHistory, setChatHistory] = useState([{
    hideInChat: true, // 是否在聊天记录中隐藏文本中的公司简介数据
    role: 'model',
    text: companyInfo,
    isError: false
  }]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  // 生成机器人回复
  const generateBotResponse = async (history) => {
    // 更新聊天记录的函数
    const updateHistory = (text, isError = false) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== '正在思考中。。。'), {role: 'model', text, isError }]);
    }
    // 将聊天记录转换为API请求格式
    history = history.map(({role, text}) => ({role, parts: [{text}]}));

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      contents: history
      })
    }

    try {
      // 发送API请求获取机器人回复
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if(!response.ok) {
        console.log('API响应数据:',data);
        throw new Error(data.error.message || 'Failed to generate bot response'); 
      }

      // 更新聊天记录
      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1')
      .trim();
      
      updateHistory(apiResponseText);
      
    } catch (error) {
      //如果发生错误，则更新聊天记录为错误信息
      updateHistory(error.message, true);
    }
  }
  // 滚动到聊天记录底部 
  useEffect(() => {
    chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behavior: 'smooth'});
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? 'show-chatbot' : ''}`}>
      <button onClick={() => setShowChatbot(prev => !prev)} id="chatbot-toggle" >
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>  
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">聊天机器人Chatbot</h2>            
          </div>
          <button onClick={() => setShowChatbot(prev => !prev)} className="material-symbols-rounded">keyboard_arrow_down</button>
        </div>

        {/* Chatbot Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
          <ChatbotIcon />
           <p className="message-text">
              Hey there! I'm the Chatbot
              <span className="welcome-icon">
                <span className="material-symbols-rounded" style={{ 
                  fontSize: '1.2em',
                  color: '#f59e0b',
                  verticalAlign: 'middle',
                  margin: '0 4px'
                }}>
                </span>
              </span> 
              <br /> 
              How can I help you today?              
           </p>
          </div>

          {/* 动态渲染历史聊天记录 */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
          
        </div>

        {/* Chatbot Footer */}
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
        </div>
      </div>
    </div>
  ); 
};

export default App;