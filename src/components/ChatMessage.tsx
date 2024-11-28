import { motion } from 'framer-motion';

interface ChatMessageProps {
  isUser: boolean;
  message: string;
}

export function ChatMessage({ isUser, message }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-md p-4 rounded-lg ${
          isUser
            ? 'bg-blue-500 text-white ml-auto'
            : 'bg-gray-200 text-gray-800 mr-auto'
        }`}
      >
        {message}
      </div>
    </motion.div>
  );
}