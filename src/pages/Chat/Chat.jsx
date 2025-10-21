import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";

function Chat() {
  const { user } = useAuth();
  const [newMsg, setNewMsg] = useState("");
  const [chatUser, setChatUser] = useState(null);
  const [chats, setChats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user_id } = useParams();

  // Fetch chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch("http://localhost/hashhub/get-chat.php", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            outgoing_id: user.id,
            incoming_id: user_id,
          }),
        });
        const data = await response.json();
        if (data.status === "success") {
          // console.log(data.chats)
          setChats(data.chats);
        } else {
          setChats([]);
        }
      } catch (err) {
        console.error("Error fetching chats:", err);
      }
    };

    fetchChats();
    const interval = setInterval(fetchChats, 1000);
    return () => clearInterval(interval);
  }, [user_id, user.id]);

  // Fetch chat user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost/hashhub/userDetails.php?user_id=${user_id}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        if (data.status === "success") {
          setChatUser(data.user);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
    const interval = setInterval(fetchUser, 3000);
    return () => clearInterval(interval);
  }, [user_id]);

  // Stop loader only when both chatUser and chats are fetched
  useEffect(() => {
    if (chatUser !== null && chats !== null) {
      setLoading(false);
    }
  }, [chatUser, chats]);

  const handleSend = async () => {
    if (!newMsg.trim()) return;
    try {
      const formData = new FormData();
      formData.append("outgoing_id", user.id);
      formData.append("incoming_id", user_id);
      formData.append("message", newMsg);

      const response = await fetch("http://localhost/hashhub/insert-chat.php", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await response.json();
      if (data.status === "success") setNewMsg("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gradient-to-br from-gray-800 via-black to-gray-900">
      {/* Header */}
      {loading ? (
        <div className="flex items-center gap-3 p-4 bg-black/30 border-b border-gray-700 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-gray-700" />
          <div className="flex flex-col gap-1">
            <div className="w-32 h-4 bg-gray-700 rounded" />
            <div className="w-20 h-3 bg-gray-700 rounded" />
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center">
          <div className="flex items-center gap-3 p-4 bg-black/30 border-b border-gray-700 w-full">
            {/* image */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700 flex-shrink-0 ">
              <img
                src={
                  chatUser?.img
                    ? `http://localhost/hashhub/uploads/${chatUser.img}`
                    : "/vite.svg"
                }
                alt={
                  chatUser
                    ? `${chatUser.firstName} ${chatUser.lastName}`
                    : "User"
                }
                className="w-full h-full object-cover"
              />
            </div>

            {/* name and status */}
            <div>
              <h1 className="font-bold text-white">
                {chatUser.firstName} {chatUser.lastName}
              </h1>
              <p className="text-sm text-green-400">
                {chatUser.status || "Offline"}
              </p>
            </div>
          </div>

          <div className=" bg-black/30 p-4 border-b border-gray-700 cursor-pointer">
            <Link to={"/home"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="45"
              width={"45"}
              viewBox="0 0 576 512"
            >
              <path
                fill="#ffffff"
                d="M204.3 43.1C215.9 32 233 28.9 247.7 35.2S272 56 272 72l0 136.3 172.3-165.1C455.9 32 473 28.9 487.7 35.2S512 56 512 72l0 368c0 16-9.6 30.5-24.3 36.8s-31.8 3.2-43.4-7.9L272 303.7 272 440c0 16-9.6 30.5-24.3 36.8s-31.8 3.2-43.4-7.9l-192-184C4.5 277.3 0 266.9 0 256s4.5-21.3 12.3-28.9l192-184z"
              />
            </svg>
            </Link>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="flex justify-start gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-700" />
              <div className="w-32 h-6 bg-gray-700 rounded-xl" />
            </div>
            <div className="flex justify-end gap-2">
              <div className="w-32 h-6 bg-green-600 rounded-xl" />
            </div>
            <div className="flex justify-start gap-2">
              <div className="w-24 h-6 bg-gray-700 rounded-xl" />
            </div>
          </div>
        ) : (
          chats.map((msg) => (
            <div
              key={msg.msg_id}
              className={`flex items-end gap-2 ${
                msg.outgoing_msg_id === user.id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {msg.outgoing_msg_id !== user.id && (
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={
                      chatUser?.img
                        ? `http://localhost/hashhub/uploads/${chatUser.img}`
                        : "/vite.svg"
                    }
                    alt={`${msg.sender_first} ${msg.sender_last}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs ${
                  msg.outgoing_msg_id === user.id
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-gray-700 text-gray-100 rounded-bl-none"
                }`}
              >
                {msg.msg}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      {!loading && (
        <div className="flex p-3 bg-black/40 border-t border-gray-700">
          <input
            type="text"
            className="flex-1 px-3 py-2 rounded-l-xl bg-gray-800 text-white focus:outline-none"
            placeholder="Type a message..."
            name="message"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            autoComplete="off"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-r-xl"
          >
            ➤
          </button>
        </div>
      )}
    </div>
  );
}

export default Chat;
