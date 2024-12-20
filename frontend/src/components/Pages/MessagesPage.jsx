import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link for routing
import axios from 'axios';
import InsiteLink from '../InsiteLink'
import MessageIcon from '../../assets/MessageIcon.svg'

const MessagesPage = () => {
  const { userId } = useParams(); // Destructure userId from params
  const [chats, setChats] = useState(null); // Initialize as null to differentiate loading state
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading
  
  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const response = await axios.get(`/api/chats/${userId}`);
        if (Array.isArray(response.data)) {
          setChats(response.data); // Ensure data is an array before updating state
        } else {
          setChats([]); // Default to empty array if data is not an array
        }
        setError(null); // Clear any previous error
      } catch (err) {
        if(err.response && err.response.status === 401){
          setError('Unauthorized')
          setChats([])
        }else{
        console.error('Error fetching chats:', err);
        setError('Failed to load chats. Please try again.');
        setChats([])}; // Reset chats to an empty array on error
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchUserChats();
  }, [userId]);

  // Safeguard for rendering when no chats exist or if there is an error
  return (
    <div className='product-box'>
      <h1>Messages</h1>

      {loading ? (
        <p>Loading chats...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : !Array.isArray(chats) || chats.length === 0 ? (
        <p>No active chats found.</p>
      ) : (
        <div>
          {chats.map((chat, index) => {
            const otherParticipant = chat.participants.find(
              (participant) => participant._id !== userId
            ); // Find the other participant in the chat
            const sortedParticipants = [userId, otherParticipant._id].sort()
            const chatId = sortedParticipants.join('/')
            console.log(chatId)
            console.log('otherparticipant', otherParticipant)
            return (
              <div key={chat._id || index} className="chat-item">
                <h3>
                  Chat with:{" "}
                  {otherParticipant ? otherParticipant._id : "Unknown"}
                </h3>
                <p>
                  Last Message:{" "}
                  {chat.lastMessage ? chat.lastMessage : "No messages yet."}
                </p>

                {/* Link to dynamic chat page */}
                {otherParticipant && (
                 
                    <InsiteLink
                      image={MessageIcon}  
                      name='Start Chat'
                      linkTo={`/chat/${chatId}`}
                      />
                
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
