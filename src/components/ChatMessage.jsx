import ChatbotIcon from './ChatbotIcon';

const ChatMessage = ({chat}) => {
  return (
    !chat.hideInChat && (
    <div className={`message ${chat.role === 'model' ? 'bot' : 'user'}-message 
    ${chat.isError ? "error" : ""}`
    }>
        {/* 如果是模型消息，显示机器人图标 */}
        {chat.role === "model" && <ChatbotIcon />}
        <p className="message-text">             
            {chat.text}
        </p>
    </div>
    )
  )
}

export default ChatMessage; 