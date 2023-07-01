import { BrowserRouter, Route, Routes } from "react-router-dom";
import GamePage from "./pages/GamePage/GamePage";
import GameSelection from "./pages/GameSelectionPage/GameSelection";
import MainDash from "./pages/MainDash/MainDash";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/selection" element={<GameSelection/>}/>
          <Route path="/" element={<MainDash/>}/>
          <Route path="/game/:roomData" element={<GamePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
