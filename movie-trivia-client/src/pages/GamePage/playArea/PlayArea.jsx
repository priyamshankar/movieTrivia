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
  const [answer, setAnswer] = useState("");
  const [correctStatus, setcorrectStatus] = useState("Guess?")
  const [admin, setadmin] = useState(localStorage.getItem("admin"));
  const [Round, setRound] = useState(-1);
  const [hints, setHints] = useState({
    director: false,
    genre: false,
    leadActor: false,
    leadActress: false,
    yearLaunched: false,
  });
  const [points, setpoints] = useState([{
    name: localStorage.getItem("playerName"), score : 100
  }]); //for future game points

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
    socket.on("someoneJoined",(data)=>{
      scoreOnjoinHandler(data.name);
    })

    return () => {
      socket.off("startGame");
      socket.off("someoneJoined");
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

  function scoreOnjoinHandler(mess){
    setpoints((prev)=>[...prev,{
      name:mess,score:100
    }])
  }

  function startTimer() {
    setGameOngoing(true);
    setTimer(360);
  }

  function startRound() {
    startTimer();
    setCurrentQuestion(moviedataSet[Round]);
  }

  function gameOver() {}

  function guessButton() {
    if (answer === currentQuestion.movieName) {
      setcorrectStatus("Correct");
      const name = localStorage.getItem("playerName");
      socket.emit("guessedit", { Room, name });

    }else{
      setcorrectStatus("Wrong");
    }
  }

  function startRoundButton() {
    socket.emit("startRoundbtn", { Room });
    startRound();
  }

  function handleHints(e) {
    setHints({ ...hints, [e.target.name]: true });
  }

  return (
    <div className="playAreaContainer">
      <div className="row1Playarea">
        <div className="col1row1pa">
          {currentQuestion && (
            <div className="dialogPlayArea">{currentQuestion.dialog}</div>
          )}
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
              <div className="hintswindow">
                <div className="hintsPa">
                  {hints.yearLaunched ? (
                    <div>{currentQuestion.yearLaunched}</div>
                  ) : (
                    <div>
                      <button name="yearLaunched" onClick={handleHints}>
                        Year Launched
                      </button>
                    </div>
                  )}
                  {hints.leadActor ? (
                    <div>{currentQuestion.leadActor}</div>
                  ) : (
                    <div>
                      <button name="leadActor" onClick={handleHints}>
                        Lead Actor
                      </button>
                    </div>
                  )}
                  {hints.leadActress ? (
                    <div>{currentQuestion.leadActress}</div>
                  ) : (
                    <div>
                      <button name="leadActress" onClick={handleHints}>
                        Lead Actress
                      </button>
                    </div>
                  )}
                  {hints.director ? (
                    <div>{currentQuestion.director}</div>
                  ) : (
                    <div>
                      <button name="director" onClick={handleHints}>
                        Director
                      </button>
                    </div>
                  )}
                  {hints.genre ? (
                    <div>{currentQuestion.genre}</div>
                  ) : (
                    <div>
                      <button name="genre" onClick={handleHints}>
                        Genre
                      </button>
                    </div>
                  )}
                </div>
                <div className="guessiconPa">
                    {correctStatus}
                </div>
              </div>
              <div className="inputFPa">
                <input
                  type="text"
                  placeholder="enter the movie name"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (answer === currentQuestion.movieName) {
                        guessButton();
                        setAnswer("");
                      }
                    }
                  }}
                />
                <button onClick={guessButton}>Guess It</button>
              </div>
            </div>
          )}
        </div>
        <div className="col2row2pa">
          {points.map((data,index)=>{return (
            <div className="pointsMap">
              <div className="playerPointname">

              {data.name}
              </div>-
              <div className="playerPointScore">
                {data.score}
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default PlayArea;

// const [data, setData] = useState([
//   { id: 1, name: 'John' },
//   { id: 2, name: 'Jane' },
//   { id: 3, name: 'Bob' }
// ]);

// const updateData = () => {
//   // Make a copy of the data array
//   const newData = [...data];

//   // Find the object to update based on a condition (e.g., id)
//   const index = newData.findIndex(item => item.id === 2);
//   if (index !== -1) {
//     // Update the object's properties
//     newData[index].name = 'Updated Name';
//   }

//   // Set the updated array as the new state
//   setData(newData);
// };