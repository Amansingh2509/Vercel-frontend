import React, { useState, useEffect } from "react";
import axios from "axios";
import { Send, MessageCircle } from "lucide-react";

const Chat = ({ bookingId, currentUser, otherUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState(null);
  const [purchaseDetails, setPurchaseDetails] = useState({
    finalPrice: "",
    moveInDate: "",
    securityDeposit: "",
    agreementDuration: "",
    specialTerms: "",
  });

  useEffect(() => {
    initializeChat();
  }, [bookingId]);

  const initializeChat = async () => {
    try {
      const response = await axios.post("/api/chat", { bookingId });
      setChatId(response.data._id);
      setMessages(response.data.messages || []);
      setPurchaseDetails(response.data.purchaseDetails || {});
    } catch (error) {
      console.error("Error initializing chat:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !chatId) return;

    try {
      const response = await axios.post(`/api/chat/${chatId}/message`, {
        senderId: currentUser.id,
        message: newMessage,
      });

      setMessages(response.data.messages);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const updatePurchaseDetails = async () => {
    if (!chatId) return;

    try {
      const response = await axios.put(`/api/chat/${chatId}/purchase`, {
        purchaseDetails,
      });

      setPurchaseDetails(response.data.purchaseDetails);
      alert("Purchase details updated!");
    } catch (error) {
      console.error("Error updating purchase details:", error);
    }
  };

  const confirmPurchase = async () => {
    if (!chatId) return;

    try {
      await axios.put(`/api/chat/${chatId}/purchase`, {
        purchaseDetails: { ...purchaseDetails, isConfirmed: true },
      });

      alert("Purchase confirmed!");
    } catch (error) {
      console.error("Error confirming purchase:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold flex items-center">
            <MessageCircle className="mr-2" />
            Chat with {otherUser?.name || "Property Owner"}
          </h3>
        </div>

        <div className="flex">
          {/* Chat Messages */}
          <div className="flex-1 p-4">
            <div className="h-96 overflow-y-auto mb-4 border rounded-lg p-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    msg.sender === currentUser.id ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block px-3 py-2 rounded-lg max-w-xs ${
                      msg.sender === currentUser.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <small className="text-xs opacity-75">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </small>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-3 py-2"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <Send size={20} />
              </button>
            </div>
          </div>

          {/* Purchase Details */}
          <div className="w-80 p-4 border-l">
            <h4 className="font-semibold mb-4">Purchase Details</h4>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Final Price</label>
                <input
                  type="number"
                  value={purchaseDetails.finalPrice || ""}
                  onChange={(e) =>
                    setPurchaseDetails({
                      ...purchaseDetails,
                      finalPrice: e.target.value,
                    })
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Move-in Date
                </label>
                <input
                  type="date"
                  value={purchaseDetails.moveInDate || ""}
                  onChange={(e) =>
                    setPurchaseDetails({
                      ...purchaseDetails,
                      moveInDate: e.target.value,
                    })
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Security Deposit
                </label>
                <input
                  type="number"
                  value={purchaseDetails.securityDeposit || ""}
                  onChange={(e) =>
                    setPurchaseDetails({
                      ...purchaseDetails,
                      securityDeposit: e.target.value,
                    })
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Agreement Duration
                </label>
                <select
                  value={purchaseDetails.agreementDuration || ""}
                  onChange={(e) =>
                    setPurchaseDetails({
                      ...purchaseDetails,
                      agreementDuration: e.target.value,
                    })
                  }
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="">Select duration</option>
                  <option value="6 months">6 months</option>
                  <option value="11 months">11 months</option>
                  <option value="1 year">1 year</option>
                  <option value="2 years">2 years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Special Terms
                </label>
                <textarea
                  value={purchaseDetails.specialTerms || ""}
                  onChange={(e) =>
                    setPurchaseDetails({
                      ...purchaseDetails,
                      specialTerms: e.target.value,
                    })
                  }
                  className="w-full border rounded px-2 py-1"
                  rows="3"
                />
              </div>

              <button
                onClick={updatePurchaseDetails}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
              >
                Update Details
              </button>

              <button
                onClick={confirmPurchase}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
