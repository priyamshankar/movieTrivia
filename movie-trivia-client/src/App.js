import { BrowserRouter, Route, Routes } from "react-router-dom";
import GamePage from "./pages/GamePage/GamePage";
import GameSelection from "./pages/GameSelectionPage/GameSelection";
import InsertMovies from "./pages/InsertMovies/InsertMovies";
import MainDash from "./pages/MainDash/MainDash";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/selection" element={<GameSelection/>}/>
          <Route path="/" element={<MainDash/>}/>
          <Route path="/game/:roomData" element={<GamePage/>}/>
          <Route path="/gamedev" element={<InsertMovies/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
