import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Styles/ChatPage.css';
import useFetchSession from '../../hooks/useFetchSession';

const socket = io('https://mern-practice-0lqg.onrender.com'); // Update with your backend URL

const ChatPage = () => {
  const {  currentUser} = useFetchSession();
  const { userId1, userId2 } = useParams(); // Get recipient IDs from URL params
  const [messages, setMessages] = useState([]); // Default to an empty array
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(null); // For storing error messages
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true); // For controlling loading state
  const currentUserId = currentUser?._id; // Assuming `userId1` is the current user


  // Fetch or create chat
  useEffect(() => {
    const fetchOrCreateChat = async () => {
      try {
        const participants = [userId1, userId2];
        const chatUrl = participants.sort().join('/');

        // Attempt to fetch the existing chat
        const response = await axios.get(`/api/chats/${chatUrl}`, { withCredentials: true });
        if(response){
        setChat(response.data); // Store the existing chat
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          // Chat doesn't exist, create a new one
          try {
            const chatId = [userId1, userId2].sort().join('_');
            console.log(chatId);
            const newChat = {
              participants: [userId1, userId2],
              lastMessage: 'No messages yet',
              chatId: chatId,
            };
            const createResponse = await axios.post('/api/chats', newChat, { withCredentials: true } );
            setChat(createResponse.data); // Store the newly created chat
          } catch (createErr) {
            setError('Failed to create a new chat.');
            console.error(createErr);
          }
        } else {
          setError('Failed to fetch chat.');
          console.error(err);
        }
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    if (userId1 && userId2) {
      fetchOrCreateChat();
    }
  }, [userId1, userId2]);

  // Fetch messages
  useEffect(() => {
    if (chat) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`/api/messages/${userId1}/${userId2}`, { withCredentials: true });
          setMessages(Array.isArray(response.data) ? response.data : []); // Ensure response is an array
        } catch (err) {
          if (err.response && err.response.status === 401) {
            setError('Unauthorized, please log in');
          } else {
            setError('Failed to load messages');
            console.error(err);
          }
        }
      };

      fetchMessages();

      // Listen for incoming messages
      socket.on('chat message', (message) => {
        if (message && message.sender && message.recipient && message.message) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      });

      // Cleanup on unmount
      return () => {
        socket.off('chat message');
      };
    }
  }, [chat, userId1, userId2]);

  const handleSendMessage = () => {
    if (newMessage.trim() && userId1 && userId2) {
      const recipient = [userId1, userId2].filter((id) => id !== currentUserId)[0];
      
      // Optimistically update the messages state
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: currentUserId, recipient, message: newMessage, timestamp: new Date() },
      ]);
      setNewMessage('');
  
      // Send message to backend
      axios.post(`/api/messages/${userId1}/${userId2}`, { message: newMessage })
        .then((response) => {
          console.log('Message sent successfully:', response);
        })
        .catch((error) => {
          console.error('Error sending message:', error);
          setError('Failed to send message.');
        });
    }
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="chat-container">
      <h2 className="chat-title">Chat with User {userId2}</h2>
      <div className="messages-container">
        {messages.length === 0 ? (
          <p>No messages yet. Be the first to send a message!</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={msg.sender === currentUserId ? 'sent' : 'received'}>
              <p className="chat-message">{msg.message}</p>
              <span className="timestamp">
                {new Date(msg.timestamp).toLocaleString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </span>
            </div>
          ))
        )}
      </div>
      <div className="chat-input-container">
        <textarea
          className="chat-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="chat-send-button" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
