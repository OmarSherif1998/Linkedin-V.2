import React from "react";

function MessagingInputBar({ handleKeyDown }) {
  return (
    <footer className="sticky bottom-0 border-t border-gray-200 bg-white p-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 rounded-lg border bg-BgColor p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={handleKeyDown}
        />
      </div>
    </footer>
  );
}

export default MessagingInputBar;
