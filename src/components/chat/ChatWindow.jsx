import { useState, useRef, useEffect } from 'react';
import { 
  PaperAirplaneIcon, 
  PhoneIcon, 
  VideoCameraIcon 
} from '@heroicons/react/24/outline';
import useChatStore from '../../store/chatStore';
import { formatRelativeTime } from '../../utils/date';
import CallModal from './CallModal';

export default function ChatWindow({ chatId }) {
  const [message, setMessage] = useState('');
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [callType, setCallType] = useState(null);
  const messagesEndRef = useRef(null);
  
  const { messages, addMessage } = useChatStore();
  const chatMessages = messages.filter(msg => 
    msg.chatId === chatId || !msg.chatId // For demo purposes, show all messages
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    addMessage({
      content: message,
      senderId: 1, // Current user ID
      timestamp: new Date().toISOString(),
      type: 'text',
      chatId
    });

    setMessage('');
  };

  const initiateCall = (type) => {
    setCallType(type);
    setIsCallModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Chat Title</h2>
          <p className="text-sm text-gray-500">3 participants</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => initiateCall('audio')}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <PhoneIcon className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => initiateCall('video')}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <VideoCameraIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderId === 1 ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.senderId === 1
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{msg.content}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.senderId === 1 ? 'text-primary-100' : 'text-gray-500'
                }`}
              >
                {formatRelativeTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
          />
          <button
            type="submit"
            className="bg-primary-500 text-white rounded-lg px-4 py-2 hover:bg-primary-600"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </form>

      <CallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        type={callType}
        chatId={chatId}
      />
    </div>
  );
}