import React, { useEffect, useState } from "react";
import "./Style/chatArea.css";
import { useParams } from "react-router-dom";

const ChatArea = ({ socket }) => {
  const [message, setMessage] = useState(null);
  const params = useParams();
  const [Room, setRoom] = useState(params.roomData);
  const [shownmessages, setshownmessages] = useState([]);
  const [pName, setPname] = useState(localStorage.getItem("playerName"));

  useEffect(() => {
    socket.on("getMessage", (data) => {
      addmessagesToState(data);
    });
    return () => {
      socket.off("getMessage");
    };
  }, []);

  function addmessagesToState(mess) {
    console.log(mess);
    setshownmessages((prevData) => [...prevData, mess]);
  }

  async function sendmessage() {
    // e.preventDefault();
    const name = await localStorage.getItem("playerName");
    setshownmessages((prevD) => [...prevD, { message: message, name: pName }]);
    await socket.emit("sendmessage", { Room, message, name });
    setMessage("");
  }

  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  return (
    <div className="chatAreaContainer">
      <div className="messageAreaChatArea">
        {shownmessages.map((data, index) => {
          return (
            <div key={index} className="messageblock">
              {data.name === pName ? (
                <div className="messageblockMy msgCommon">
                  <span>{data.name}</span>
                  <div>{data.message}</div>
                </div>
              ) : (
                <div className="messageblockOther msgCommon">
                  <span>{data.name}</span>
                  <div>{data.message}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="textareaChatArea">
        <input value={message}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendmessage();
              event.target.value = "";
            }
          }}
          type="text"
          onChange={handleMessageChange}
        />
        <button onClick={sendmessage}>send</button>
      </div>
    </div>
  );
};

export default ChatArea;
