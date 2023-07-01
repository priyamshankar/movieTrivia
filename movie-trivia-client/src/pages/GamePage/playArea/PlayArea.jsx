import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:8005");

const PlayArea = () => {
  const params = useParams();
  const [moviedataSet, setmoviedataSet] = useState(null);
  const [Room, setRoom] = useState(params.roomData);
  const [timer, setTimer] = useState(0);
  const [currentQuestion,setCurrentQuestion] = useState();
  const [gameongoing,setGameOngoing] = useState(false);
  const [answer,setAnswer] = useState();
  const [points,setpoints]= useState(0);
  const [admin, setadmin] = useState(localStorage.getItem("admin"))


  useEffect(() => {
    socket.on("startGame", (data) => {
        console.log(data);
        startRound();
    });
    return () => {
      socket.off("startGame");
    };
  }, []);

  useEffect(() => {
    async function getData() {
      const roomdata = params.roomData;
      const moviedata = await axios
        .post("http://localhost:5000/api/getmovie", { roomdata })
        .then((res) => {
          setmoviedataSet(res.data);
        });
    }
    getData();
  }, []);

  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
    if (timer === 0) {
      setRound(Round+1);
      setGameOngoing(false);
      if(Round===5){
        gameOver();
      }
    }
  }, [timer]);

  const [Round, setRound] = useState(0);

  const startTimer = () => {
    setGameOngoing(true);
    setTimer(20);
  };

  function startRound() {
    startTimer();
    setCurrentQuestion(moviedataSet[Round]);
    // console.log(currentQuestion);
  }

  function gameOver(){

  }

  function guessButton(e){
    e.preventDefault();
    if(answer===currentQuestion.movieName){
        alert('movie naem correct');
        const name = localStorage.getItem("playerName");
        socket.emit("guessedit",{Room,name});
    }
  }
  function startRoundButton(){
    socket.emit("startRoundbtn",{Room});
    startRound();
  }

  return (
    <div>
      {admin==="true" && !gameongoing? <><button onClick={startRoundButton}> Start game </button></>:""}
      {timer}
      {currentQuestion && currentQuestion.dialog}
      {gameongoing && <div className="ongoinggamearea">
        <input type="text" placeholder="enter the movie name" onChange={(e)=>{
            setAnswer(e.target.value);
        }}/>
        <button onClick={guessButton}>Guess It</button>

      </div> }
      
    </div>
  );
};

export default PlayArea;
