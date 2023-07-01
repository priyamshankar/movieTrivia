import React, { useEffect, useState } from 'react';
import "./style/GamePage.css";
import io from "socket.io-client";

const socket = io("http://localhost:8005");

const GamePage = () => {
    const [Room, setRoom] = useState(null);
    const [message,setMessage] = useState(null);

    useEffect(() => {
      
        socket.on("rec",(data)=>{
            
            console.log(data);
        })
      return () => {
        socket.off("rec");
      }
    }, [])
    

    function handleRoomChange(e){
        // console.log(e.target.value)
        setRoom(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(Room!=null){
            socket.emit("roomId",Room);
            // console.log("hello");
        }
    }

    function sendmessage(e){
        e.preventDefault();
        socket.emit("getMessage",{Room,message});
    }

    function handleMessageChange(e){
        setMessage(e.target.value);
    }
  return (
    <div>
        <input type="text" onChange={handleRoomChange}/>
        <button onClick={handleSubmit}>Join</button>
        <input type="text" onChange={handleMessageChange}/>
        <button onClick={sendmessage}>send</button>
    </div>
  )
}

export default GamePage