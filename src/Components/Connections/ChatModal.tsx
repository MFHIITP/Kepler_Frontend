import React from 'react';
import { MessageSquare, X } from 'lucide-react';
import { ConnectionUser } from './Connection.interface';
import { messageFormatInterface } from './ConnectionMessages.interface';

interface Props {
  activeChatUser: ConnectionUser;
  closeChat: () => void;

  messages: messageFormatInterface[];
  currentMessage: string;
  setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;

  handleSendMessages: () => void;
  email: string
}

const ChatModal: React.FC<Props> = ({
  activeChatUser,
  closeChat,
  messages,
  currentMessage,
  setCurrentMessage,
  handleSendMessages,
  email
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">
              {activeChatUser.avatar || '👤'}
            </div>
            <div className="text-white">
              <h3 className="font-semibold">
                {activeChatUser.name}
              </h3>
              <p className="text-sm text-blue-100">
                {activeChatUser.headline}
              </p>
            </div>
          </div>

          <button
            onClick={closeChat}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {(!messages || messages.length === 0) ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <MessageSquare size={48} className="mb-2" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === email
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      msg.sender === email
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">
                      {msg.chatmessage}
                    </p>

                    <p
                      className={`text-xs mt-1 ${
                        msg.sender === email
                          ? 'text-blue-100'
                          : 'text-gray-500'
                      }`}
                    >
                      {msg.date.toString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessages();
                }
              }}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />

            <button
              onClick={handleSendMessages}
              disabled={!currentMessage.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <span>Send</span>
              <MessageSquare size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatModal;
