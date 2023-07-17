import React, { useState } from "react";

// Mock data
const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Bob Johnson" },
];

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(users[0]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex h-screen">
      {/* Left sidebar */}
      <div className="w-1/4 bg-gray-100">
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Users</h2>
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                className={`p-2 cursor-pointer ${
                  selectedUser && selectedUser.id === user.id
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                onClick={() => handleUserSelect(user)}
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right chat section */}
      <div className="flex-1 bg-white">
        {selectedUser ? (
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">
              Chat with {selectedUser.name}
            </h2>
            {/* Display chat messages here */}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a user to start a chat</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
