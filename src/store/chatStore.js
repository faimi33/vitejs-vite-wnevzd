import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { teamMembers } from '../data/teamMembers';

const generateDummyMessages = () => {
  const allMembers = Object.values(teamMembers)
    .flatMap(dept => dept.members);
  
  const messages = [
    {
      id: 1,
      senderId: 1,
      content: "Hey team, how's the website redesign coming along?",
      timestamp: "2024-03-19T09:30:00",
      type: "text"
    },
    {
      id: 2,
      senderId: 4,
      content: "We're making good progress. The new UI looks great!",
      timestamp: "2024-03-19T09:32:00",
      type: "text"
    },
    {
      id: 3,
      senderId: 7,
      content: "Can we schedule a review meeting for tomorrow?",
      timestamp: "2024-03-19T09:35:00",
      type: "text"
    }
  ];

  return messages;
};

const generateDummyGroups = () => {
  return [
    {
      id: 'g1',
      name: 'Website Redesign Team',
      members: [1, 4, 7],
      avatar: '/group-avatars/website-team.jpg'
    },
    {
      id: 'g2',
      name: 'Marketing Campaign',
      members: [2, 5, 8],
      avatar: '/group-avatars/marketing-team.jpg'
    },
    {
      id: 'g3',
      name: 'All Hands',
      members: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      avatar: '/group-avatars/all-hands.jpg'
    }
  ];
};

const useChatStore = create(
  persist(
    (set, get) => ({
      activeChat: null,
      messages: generateDummyMessages(),
      groups: generateDummyGroups(),
      calls: [],
      setActiveChat: (chatId) => set({ activeChat: chatId }),
      addMessage: (message) => set(state => ({
        messages: [...state.messages, { ...message, id: Date.now() }]
      })),
      startCall: (callData) => set(state => ({
        calls: [...state.calls, { ...callData, id: Date.now() }]
      })),
      endCall: (callId) => set(state => ({
        calls: state.calls.filter(call => call.id !== callId)
      }))
    }),
    {
      name: 'chat-storage'
    }
  )
);

export default useChatStore;