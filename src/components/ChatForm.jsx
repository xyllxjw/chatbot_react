import { useRef } from 'react';

const ChatForm = ({chatHistory, setChatHistory, generateBotResponse}) => {
  const inputRef = useRef();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if(userMessage === '') return;
    inputRef.current.value = '';
    // 将用户输入更新聊天记录 
    setChatHistory(history => [...history, {role: 'user', text: userMessage}]);
     
    setTimeout(() => {
        setChatHistory(history => 
            [...history, 
                {role: 'model', text: '正在思考中。。。'}
            ]
        );
        // 将用户输入post到AI，生成机器人回复
        // generateBotResponse([...chatHistory, {role: 'user', text: userMessage}]); 
        // 将用户输入和公司简介合并成一个字符串，作为机器人回复的输入，生成机器人回复
        generateBotResponse([...chatHistory, {role: 'user', text: `Using the details provided in the company profile, please address this query: ${userMessage}` }]);
    }, 600);

    
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
          <input ref={inputRef} type="text" placeholder="请输入您的问题。。。" className="message-input" required />
          <button className="material-symbols-rounded">arrow_upward</button>
    </form>
  )
}

export default ChatForm;