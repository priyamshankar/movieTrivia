import React, { useEffect, useState } from "react";
import "./style/GamePage.css";
import io from "socket.io-client";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import PlayArea from "./playArea/PlayArea";
import ChatArea from "./chatArea/ChatArea";


const GamePage = () => {
  const socket = io("http://localhost:8005");
  const navigate = useNavigate();
  const params = useParams();
  const [Room, setRoom] = useState(params.roomData);
  const [message, setMessage] = useState(null);


  useEffect(() => {
    if (Room != null) {
      socket.emit("joinRoom", Room);
      if (localStorage.getItem("playerName") == null) {
        alert("Enter your name at the main page");
        navigate("/");
      }
    }
    return () => {
      if (Room != null) {
        socket.emit("leaveRoom", Room);
      }
    };
  }, []);

  async function sendmessage(e) {
    e.preventDefault();
    const name =await localStorage.getItem("playerName");
    socket.emit("sendmessage", { Room, message, name });
  }

  function handleMessageChange(e) {
    setMessage(e.target.value);
  }
  return (
    <div className="gamepage_container">
        <PlayArea socket={socket}/>
        <ChatArea socket={socket}/>
    </div>
  );
};

export default GamePage;
