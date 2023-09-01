import "./App.css";
import Home from "./pages/home/home";
import Anime from "./pages/anime/anime";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/login and register/Login";
import store from "./store/store";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/userlist" element={<Anime />} />
        <Route path="/auth" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
