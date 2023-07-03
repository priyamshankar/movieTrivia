import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlayArea = ({ socket }) => {
  const params = useParams();
  const [moviedataSet, setmoviedataSet] = useState(null);
  const [Room, setRoom] = useState(params.roomData);
  const [timer, setTimer] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [gameongoing, setGameOngoing] = useState(false);
  const [answer, setAnswer] = useState();
  const [points, setpoints] = useState(0); //for future game points
  const [admin, setadmin] = useState(localStorage.getItem("admin"));
  const [Round, setRound] = useState(-1);

  useEffect(() => {
    async function getData() {
      const roomdata = params.roomData;
      const moviedata = await axios
        .post("http://localhost:5000/api/getmovie", { roomdata })
        .then((res) => {
          setmoviedataSet(res.data);
          console.log("data set on non admin", res.data);
        });
    }
    getData();
  }, []);

  useEffect(() => {
    // socket.on("startGame", (data) => {
    //   if (moviedataSet) {
    //     startRound();
    //   }
    // });
    const handleStartGame = ()=>{
      startRound();   
    }
    socket.on("startGame",handleStartGame);

    socket.on("guessitBack", (data) => {
      console.log(data);
    });

    return () => {
      socket.off("startGame");
      socket.off("guessitBack");
    };
  }, [moviedataSet,Round,socket]);

  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
    if (timer === 0) {
      // setRound(Round + 1);
      setRound(prevRound => prevRound + 1);
      setGameOngoing(false);
      if (Round === 5) {
        gameOver();
      }
    }
  }, [timer,setTimer]);

  // useEffect(()=>{
  //   if(timer===0){
  //     // setRound(prevRound=>prevRound+1);
  //   }
  // },[timer]);

  function startTimer(){
    setGameOngoing(true);
    setTimer(2);
  };

  function startRound() {
    startTimer();
    // setRound(Round + 1);
    // console.log(Round);
    console.log("here is the round",Round);

    setCurrentQuestion(moviedataSet[Round]);   
    // setRound(prevRound => prevRound + 1);
  }

  function gameOver() {}

  function guessButton(e) {
    e.preventDefault();
    if (answer === currentQuestion.movieName) {
      alert("movie name correct");
      const name = localStorage.getItem("playerName");
      socket.emit("guessedit", { Room, name });
    }

  }
  function startRoundButton() {
    socket.emit("startRoundbtn", { Room });
    startRound();

  }

  return (
    <div>
      {admin === "true" && !gameongoing ? (
        <>
          <button onClick={startRoundButton}> Start game </button>
        </>
      ) : (
        ""
      )}
      {timer}
      {currentQuestion && <>{currentQuestion.dialog}</>}
      {gameongoing && (
        <div className="ongoinggamearea">
          <input
            type="text"
            placeholder="enter the movie name"
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
          />
          <button onClick={guessButton}>Guess It</button>
        </div>
      )}
    </div>
  );
};

export default PlayArea;
