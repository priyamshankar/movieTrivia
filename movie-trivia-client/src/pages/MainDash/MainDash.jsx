import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MainDash = () => {
  const navigate = useNavigate();
  const [Dialogbool, setDialogbool] = useState(false);
  const [roomId, setroomId] = useState(null);
  const [playerName, setplayerName] = useState(null);

  async function isRoomValid() {
    var state ;
    await axios
      .post("http://localhost:5000/api/checkroom", {
        room: roomId,
      })
      .then((res) => {
        state=res.data;
      });
      return state;
  }

  async function handleJoinRoom(e) {
    if (roomId != null) {
        const result = await isRoomValid();
        // console.log(result)
      if (result  === true) {
        navigate(`/game/${roomId}`);
      } else {
        alert("Room id dosen't exist Enter a valid one");
      }
    }
  }

  async function handleCreateRoom() {
    if(playerName===null){
        alert("first enter the player name");
        return;
    }
    const result = await isRoomValid();

    if (result === true) {
        alert("Room id already exist Enter another one");
      } else {
        axios.post("http://localhost:5000/api/addroom",{
            room:roomId,
            players:[
                {
                    player : playerName
                }
            ]
        }).then((res)=>{
            console.log(res);
            navigate(`/game/${roomId}`);
        })
      }
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="enter you name"
          onChange={(e) => {
            localStorage.setItem("playerName", e.target.value);
            setplayerName(e.target.value);
          }}
        />
      </div>
      {Dialogbool && (
        <div className="dialogBox">
          <input
            type="text"
            onChange={(e) => {
              setroomId(e.target.value);
            }}
          />
          <button onClick={handleJoinRoom}>Join Room</button>
        </div>
      )}
      {!Dialogbool && (
        <div className="createRoomDialogBox">
          <input type="text" placeholder="Enter the room name" onChange={(e) => {
              setroomId(e.target.value);
            }}/>
          <button onClick={handleCreateRoom}>create a Room</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setDialogbool(true);
            }}
          >
            join a room
          </button>
        </div>
      )}
    </>
  );
};

export default MainDash;
