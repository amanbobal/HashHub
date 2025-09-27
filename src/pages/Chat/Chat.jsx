import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';

function Chat() {
  const {user} = useAuth()
  const [newMsg, setNewMsg] = useState("");
  const [chatUser, setChatUser] = useState(null);
  const { user_id } = useParams();

  useEffect(() => {
  // Function to fetch user info
  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost/hashhub/userDetails.php?user_id=${user_id}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.status === "success") {
        setChatUser(data.user);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  // Fetch immediately
  fetchUser();

  // Set interval to fetch every 3 seconds
  const interval = setInterval(fetchUser, 3000);

  // Cleanup on unmount
  return () => clearInterval(interval);
}, [user_id]);

  const handleSend = async () => {
  if (!newMsg.trim()) return;

  try {
    const formData = new FormData();
    formData.append("outgoing_id", user.id); // your logged-in user
    formData.append("incoming_id", user_id);      // the chat user
    formData.append("message", newMsg);

    const response = await fetch("http://localhost/hashhub/insert-chat.php", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await response.json();
    if(data.status === "success"){
      setNewMsg("");
    } else {
      console.error(data.message);
    }
  } catch(err) {
    console.error("Error sending message:", err);
  }
};


  return (
    <div className="flex flex-col w-full h-screen bg-gradient-to-br from-gray-800 via-black to-gray-900">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-black/30 border-b border-gray-700">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={chatUser?.img ? `http://localhost/hashhub/uploads/${chatUser.img}` : "/vite.svg"}
            alt={chatUser ? `${chatUser.firstName} ${chatUser.lastName}` : "User"}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="font-bold text-white">
            {chatUser ? `${chatUser.firstName} ${chatUser.lastName}` : "Loading..."}
          </h1>
          <p className="text-sm text-green-400">{chatUser?.status || "Offline"}</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs ${
                msg.sender === "me"
                  ? "bg-green-600 text-white rounded-br-none"
                  : "bg-gray-700 text-gray-100 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))} */}
      </div>

      {/* Input Box */}
      <div className="flex p-3 bg-black/40 border-t border-gray-700">
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded-l-xl bg-gray-800 text-white focus:outline-none"
          placeholder="Type a message..."
          name='message'
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-r-xl"
        >
          ➤
        </button>
      </div>
    </div>
  );
}

export default Chat;
