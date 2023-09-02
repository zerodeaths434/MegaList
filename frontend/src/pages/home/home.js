import "./home.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.user);
  return (
    <div className="home-page-div">
      <div className="mainDiv">
        <Link to={`${user || "guest"}?list=anime`}>
          <div className="contentDiv animeDiv">
            <img
              src="https://wallpapers.com/images/hd/anime-collage-1920-x-1080-wallpaper-fwx8xyvh2rd4ju8n.jpg"
              alt="Anime"
            />
            <h1 className="trying">ANIME</h1>
          </div>
        </Link>
        <Link to={`${user || "guest"}?list=movie`}>
          <div className="contentDiv movieDiv">
            <img
              src="https://e0.pxfuel.com/wallpapers/442/396/desktop-wallpaper-film-posters-collage-movies-resolution.jpg"
              alt="Anime"
            />
            <h1 className="trying">MOVIES</h1>
          </div>
        </Link>
        <Link to={`${user || "guest"}?list=series`}>
          <div className="contentDiv seriesDiv">
            <img
              src="https://i.pinimg.com/originals/ba/05/5e/ba055e048c003933747a91c64c20cc17.jpg"
              alt="Anime"
            />
            <h1 className="trying">SERIES</h1>
          </div>
        </Link>
        <Link to={`${user || "guest"}?list=game`}>
          <div className="contentDiv booksDiv">
            <img
              src="https://c4.wallpaperflare.com/wallpaper/96/92/869/game-games-2014-best-wallpaper-preview.jpg"
              alt="Anime"
            />
            <h1 className="trying">GAMES</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
