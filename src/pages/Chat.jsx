import ChatSidebar from '../components/chat/ChatSidebar';
import ChatWindow from '../components/chat/ChatWindow';
import useChatStore from '../store/chatStore';

export default function Chat() {
  const { activeChat } = useChatStore();

  return (
    <div className="flex-1 flex overflow-hidden">
      <ChatSidebar />
      {activeChat ? (
        <ChatWindow chatId={activeChat} />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">
              Select a conversation to start chatting
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Choose from your direct messages or group chats
            </p>
          </div>
        </div>
      )}
    </div>
  );
}