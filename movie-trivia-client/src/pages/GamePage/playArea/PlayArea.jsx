import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style/PlayArea.css";

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
    const handleStartGame = () => {
      startRound();
    };
    socket.on("startGame", handleStartGame);

    return () => {
      socket.off("startGame");
    };
  }, [moviedataSet, Round, socket]);

  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
    if (timer === 0) {
      // setRound(Round + 1);
      setRound((prevRound) => prevRound + 1);
      setGameOngoing(false);
      if (Round === 5) {
        gameOver();
      }
    }
  }, [timer, setTimer]);

  function startTimer() {
    setGameOngoing(true);
    setTimer(360);
  }

  function startRound() {
    startTimer();
    setCurrentQuestion(moviedataSet[Round]);
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
    <div className="playAreaContainer">
      <div className="row1Playarea">
        <div className="col1row1pa">
          {currentQuestion && <div className="dialogPlayArea">{currentQuestion.dialog}</div>}
          
        </div>
        <div className="col2row1pa">
          <span>{timer}</span>
          {admin === "true" && !gameongoing ? (
            <>
              <button onClick={startRoundButton}> Start game </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="row2playarea">
        <div className="col1row2pa">
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
        <div className="col2row2pa"></div>
      </div>
    </div>
  );
};

export default PlayArea;
