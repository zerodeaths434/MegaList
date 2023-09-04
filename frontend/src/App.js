import "./App.css";
import Home from "./pages/home/home";
import Userlist from "./pages/userlist/userlist";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/login and register/Login";
import store from "./store/store";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/:userId" element={<Userlist />} />
        <Route path="/auth" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

//{`/${user}`}
