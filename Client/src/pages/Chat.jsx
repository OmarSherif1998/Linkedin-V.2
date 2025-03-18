/** @format */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/sllices/userSlice";
import { useConnections } from "../hooks/useConnections.js";
import ChatWindow from "../components/Chat/ChatWindow.jsx";
import MessagingTab from "../components/Chat/MessagingTab";

const chatRight1920 = [
  "right-[15.2%]",
  "right-[32.5%]",
  "right-[50%]",
  "right-[67%]",
];
const chatRight1280 = ["right-[23%]", "right-[48.5%]", "right-[74%]"];

function Chat() {
  const { checkConnections } = useConnections();
  const [MAX_CHAT_TABS, setMAX_CHAT_TABS] = useState(3);
  const user = useSelector(selectUser);
  const [chatTabs, setChatTabs] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [messagingTabID, setMessagingTabID] = useState([]);

  useEffect(() => {
    const userConnections = async () => {
      if (!user?._id) {
        console.log("User ID is not available");
        return;
      }
      try {
        await checkConnections(user?._id);
      } catch (error) {
        console.log("CHAT ERROR: Error getting connections", error);
      }
    };
    userConnections();
  }, []);

  const updateWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    const newMaxTabs = screenWidth >= 1920 ? 4 : screenWidth >= 1280 ? 3 : 0;
    if (newMaxTabs !== MAX_CHAT_TABS) {
      setMAX_CHAT_TABS(newMaxTabs);
    }
    if (chatTabs.length > newMaxTabs) {
      setChatTabs((prevTabs) => prevTabs.slice(0, newMaxTabs));
    }
    return () => window.removeEventListener("resize", updateWidth);
  }, [screenWidth]);

  const openNewChatTab = (chatID, componentName) => {
    const isChatAlreadyOpen = chatTabs.some(
      (chatTab) => chatTab.chatID === chatID,
    );

    if (isChatAlreadyOpen) {
      console.log("Chat with this ID is already open.");
      return;
    }

    if (chatTabs.length >= MAX_CHAT_TABS) {
      console.log("Max chat tabs reached:", chatTabs.length);
      return;
    }

    setChatTabs((prevTabs) => [
      ...prevTabs,
      { isOpen: true, chatID, componentName },
    ]);
  };

  const closeChatTab = (chatID) => {
    //	console.log('Close chatID: ', chatID);
    setChatTabs((prevTabs) => prevTabs.filter((tab) => tab.chatID !== chatID)); // Remove the chat tab by index
  };
  //console.log('chatTabs: ', chatTabs);
  return (
    <div>
      <div className="fixed bottom-0 right-0">
        <MessagingTab
          openNewChatTab={openNewChatTab}
          closeChatTab={closeChatTab}
          setMessagingTabID={setMessagingTabID}
        />
      </div>

      {chatTabs.map((chat, index) => (
        <div
          key={chat.chatID}
          className={`fixed bottom-0 ${
            screenWidth >= 1920 ? chatRight1920[index] : chatRight1280[index]
          } `}
        >
          {chat.isOpen && (
            <ChatWindow
              componentName={chat.componentName}
              chatID={chat.chatID}
              closeChatTab={closeChatTab}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Chat;

// /** @format */

// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../Redux/sllices/userSlice';
// import { useConnections } from '../hooks/useConnections.js';
// import ChatWindow from '../components/Chat/ChatWindow.jsx';
// import MessagingTab from '../components/Chat/MessagingTab';

// const chatRight1920 = ['right-[16%]', 'right-[38%]', 'right-[60%]'];
// const chatRight1280 = ['right-[23%]', 'right-[55%]'];

// function Chat() {
// 	const { checkConnections } = useConnections();
// 	const [MAX_CHAT_TABS, setMAX_CHAT_TABS] = useState(0); // Set default to 0
// 	const user = useSelector(selectUser);
// 	const [chatTabs, setChatTabs] = useState([]); // Array to track individual chat states
// 	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

// 	// Function to update the screen width when window is resized
// 	const updateWidth = () => {
// 		setScreenWidth(window.innerWidth);
// 	};
// 	useEffect(() => {
// 		// Add event listener to update width when resizing
// 		window.addEventListener('resize', updateWidth);

// 		// Set MAX_CHAT_TABS based on screen width
// 		if (screenWidth >= 1920) {
// 			setMAX_CHAT_TABS(3); // Allow 3 chat tabs for larger screens
// 		} else if (screenWidth >= 1280) {
// 			setMAX_CHAT_TABS(2); // Allow 1 chat tab for medium screens
// 		} else {
// 			setMAX_CHAT_TABS(1); // No chat tabs for small screens
// 		}

// 		// Remove excess chat tabs if they exceed the new MAX_CHAT_TABS
// 		if (chatTabs.length > MAX_CHAT_TABS) {
// 			setChatTabs((prevTabs) => prevTabs.slice(0, MAX_CHAT_TABS)); // Keep only the allowed number of chat tabs
// 		}

// 		// Clean up the event listener on component unmount
// 		return () => window.removeEventListener('resize', updateWidth);
// 	}, [screenWidth]);

// 	const openNewChatTab = () => {
// 		//	console.log(chatTabs.length);
// 		if (chatTabs.length < MAX_CHAT_TABS) {
// 			setChatTabs((prevTabs) => [...prevTabs, true]); // Add a new chat tab (open state)
// 		} else {
// 			console.log('Max chat tabs reached');
// 		}
// 		//	console.log(chatTabs);
// 		const userConnections = async () => {
// 			if (!user?._id) {
// 				console.log('User ID is not available');
// 				return; // Exit early if user._id is undefined
// 			}
// 			try {
// 				const response = await checkConnections(user._id);
// 				// console.log('Connections:', response); // Debugging log
// 			} catch (error) {
// 				console.log('CHAT ERROR: Error getting connections', error);
// 			}
// 		};
// 		userConnections();
// 	};

// 	const closeChatTab = (index) => {
// 		setChatTabs((prevTabs) => prevTabs.filter((_, i) => i !== index)); // Remove the chat tab by index
// 	};

// 	return (
// 		<div>
// 			<>
// 				{chatTabs.map((isOpen, index) => (
// 					<div
// 						key={index}
// 						className={`fixed bottom-0 ${
// 							screenWidth >= 1920 ? chatRight1920[index] : chatRight1280[index]
// 						} `}
// 					>
// 						{isOpen && (
// 							<ChatWindow
// 								closeChatTab={() => closeChatTab(index)} // Close the chat tab when needed
// 								openNewChatTab={openNewChatTab}
// 							/>
// 						)}
// 					</div>
// 				))}
// 			</>

// 			<div className='fixed bottom-0 right-0'>
// 				<MessagingTab openNewChatTab={openNewChatTab} />
// 			</div>
// 		</div>
// 	);
// }

// export default Chat;

// const handleUserChat = (connection) => {
// 	closeChatTab();
// 	setIsUserChat((prevState) => !prevState);
// 	openNewChatTab();
// 	setIsUserChatInfo(connection);
// };
