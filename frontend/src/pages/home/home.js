import "./home.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import animepic from "./anime.jpg";
import gamepic from "./games.jpg";
import moviespic from "./movies.jpg";
import seriespic from "./series.jpg";

function Home() {
  const user = useSelector((state) => state.user);
  return (
    <div className="home-page-div">
      <div className="mainDiv">
        <Link to={`${user || "guest"}?list=anime`}>
          <div className="contentDiv animeDiv">
            <img src={animepic} alt="Anime background" />
            <h1 className="home-card-title">ANIME</h1>
          </div>
        </Link>
        <Link to={`${user || "guest"}?list=movie`}>
          <div className="contentDiv movieDiv">
            <img src={moviespic} alt="Movies background" />
            <h1 className="home-card-title">MOVIES</h1>
          </div>
        </Link>
        <Link to={`${user || "guest"}?list=series`}>
          <div className="contentDiv seriesDiv">
            <img src={seriespic} alt="Series background" />
            <h1 className="home-card-title">SERIES</h1>
          </div>
        </Link>
        <Link to={`${user || "guest"}?list=game`}>
          <div className="contentDiv booksDiv">
            <img src={gamepic} alt="Games background" />
            <h1 className="home-card-title">GAMES</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
