import React, { useEffect, useState } from "react";
import "./style/GamePage.css";
import io from "socket.io-client";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const socket = io("http://localhost:8005");

const GamePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [Room, setRoom] = useState(params.roomData);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    socket.on("rec", (data) => {
      console.log(data);
    });
    return () => {
      socket.off("rec");
    };
  }, []);

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

  function handleRoomChange(e) {
    // console.log(e.target.value)
    setRoom(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Room != null) {
      socket.emit("roomId", Room);
    }
  }

  function sendmessage(e) {
    e.preventDefault();
    socket.emit("sendmessage", { Room, message });
  }

  function handleMessageChange(e) {
    setMessage(e.target.value);
  }
  return (
    <div>
      <input type="text" onChange={handleRoomChange} />
      <button onClick={handleSubmit}>Join</button>
      <input type="text" onChange={handleMessageChange} />
      <button onClick={sendmessage}>send</button>
    </div>
  );
};

export default GamePage;
