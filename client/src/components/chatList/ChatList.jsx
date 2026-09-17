import { Link } from "react-router-dom";
import "./chatList.css";


const ChatList = () => {
  

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore NEXORA AI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        <Link to="/dashboard/chats/1">Chat 1</Link>
        <Link to="/dashboard/chats/2">Chat 2</Link>
        <Link to="/dashboard/chats/3">Chat 3</Link>
        <Link to="/dashboard/chats/4">Chat 4</Link>
        <Link to="/dashboard/chats/5">Chat 5</Link>
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>Upgrade to NEXORA AI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>

  );
};

export default ChatList;