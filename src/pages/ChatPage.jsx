import React from "react";
import Chat from "../components/Chat";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { bookingId } = useParams();

  // Mock current user - in real app, get from auth context
  const currentUser = {
    id: "currentUserId",
    name: "Current User",
    email: "user@example.com",
  };

  const otherUser = {
    name: "Property Owner",
    email: "owner@example.com",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Property Chat</h1>
        <Chat
          bookingId={bookingId}
          currentUser={currentUser}
          otherUser={otherUser}
        />
      </div>
    </div>
  );
};

export default ChatPage;
