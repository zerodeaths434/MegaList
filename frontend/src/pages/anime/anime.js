import "./anime.css";
import Card from "../../components/cards/Card";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

function Anime() {
  const [clicked, isClicked] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const [recommendedList, setRecommendedList] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [userList, setUserList] = useState([]);
  const [disableRating, setDisableRating] = useState(false);
  const [disableDateWatched, setDisableDateWatched] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [imageSource, setImageSource] = useState("");
  const user = useSelector((state) => state.user);

  const handleClick = () => {};

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  let { userId } = useParams();
  console.log(userId);

  const listType = searchParams.get("list");
  let imageSrc;

  useEffect(() => {
    fetchAllCards();
  }, []);

  const fetchAllCards = () => {
    console.log(listType);
    try {
      axios
        .get(`http://localhost:5000/post/${listType}`, {
          headers: {
            username: userId,
          },
        })
        .then((res) => setUserList(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setSearchedValue(e.target.value);
    switch (listType) {
      case "anime":
        fetchAnime();
        return;

      case "movie":
        fetchMovies();
        return;

      case "series":
        fetchSeries();
        return;

      case "game":
        fetchGames();
        return;

      default:
        console.log("Never going to hit");
    }
  };

  const handleSort = (e) => {
    console.log(e.target.value);
    const selectedOption = e.target.value;
    let newSortedList;
    switch (selectedOption) {
      case "dateAddedNewToOld":
        newSortedList = [...userList].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setUserList(newSortedList);
        break;

      case "dateAddedOldToNew":
        newSortedList = [...userList].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setUserList(newSortedList);
        break;

      case "ratingLowToHigh":
        newSortedList = [...userList].sort((a, b) => a.rating - b.rating);
        setUserList(newSortedList);
        break;

      case "ratingHighToLow":
        newSortedList = [...userList].sort((a, b) => b.rating - a.rating);
        setUserList(newSortedList);
        break;

      case "alphabetical":
        newSortedList = [...userList].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setUserList(newSortedList);
        break;
    }
  };

  const debouncedChange = debounce(handleChange, 600);

  const handleRecommendationClick = (item) => {
    setSelectedItem(item);

    console.log(item);
    console.log(imageSource);
    setOpenModal(!openModal);
  };

  const getImage = () => {
    switch (listType) {
      case "anime":
        return selectedItem?.images?.jpg.large_image_url;

      case "movie":
        return `https://image.tmdb.org/t/p/original/${selectedItem?.poster_path}`;

      case "series":
        return selectedItem.image_thumbnail_path;

      case "game":
        return selectedItem.background_image;

      default:
        console.log("Never going to hit");
    }
  };

  const fetchAnime = () => {
    try {
      fetch(
        `https://api.jikan.moe/v4/anime?q=${searchedValue}&order_by=popularity&sort=asc&sfw`
      )
        .then((res) => res.json())
        .then((resData) => setRecommendedList(resData.data));

      if (recommendedList.length > 0) {
        isClicked(!clicked);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSeries = () => {
    try {
      fetch(`https://www.episodate.com/api/search?q=${searchedValue}&page=1`)
        .then((res) => res.json())
        .then((resData) => setRecommendedList(resData.tv_shows));

      if (recommendedList.length > 0) {
        isClicked(!clicked);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchGames = () => {
    try {
      fetch(
        `https://api.rawg.io/api/games?key=ddd4bf6b37844f55b33cbc45105e1164&search=${searchedValue}`
      )
        .then((res) => res.json())
        .then((resData) => setRecommendedList(resData.results));

      if (recommendedList.length > 0) {
        isClicked(!clicked);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMovies = () => {
    try {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchedValue}&include_adult=false&language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTA3NmZkYTJjMjE0NzU5NzY0MmZkM2EyNjFhZDg4MyIsInN1YiI6IjY0MDExMTNjN2E0ZWU3MDBhYWFkYjQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4AhouJqQAijx4cvjYyKpvssaiWNRRICShJHh3eomtKE",
          },
        }
      )
        .then((res) => res.json())
        .then((resData) => setRecommendedList(resData.results));

      if (recommendedList.length > 0) {
        isClicked(!clicked);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(recommendedList);

  return (
    <>
      <div className={`${openModal ? "modalDiv" : "modalDiv hide"}`}></div>
      <div className={`${openModal ? "modal" : "modal hide"}`}>
        <i
          className="fa fa-times temp-close"
          aria-hidden="true"
          onClick={() => setOpenModal(false)}
        ></i>
        <div className="image-container">
          <img src={getImage()} alt="This is random" />
        </div>
        <div className="animeTitle">{selectedItem.title}</div>
        <div className="ratingsDiv">
          <label for="cars" className="rating-label">
            Rating
          </label>
          <select name="cars" id="cars" disabled={disableRating}>
            <option value="volvo">1</option>
            <option value="saab">2</option>
            <option value="opel">3</option>
            <option value="audi">4</option>
            <option value="audi">5</option>
            <option value="audi">6</option>
            <option value="audi">7</option>
            <option value="audi">8</option>
            <option value="audi">9</option>
            <option value="audi">10</option>
          </select>
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="Bike"
            className="input-margin-left"
            onClick={() => setDisableRating(!disableRating)}
          />
          <label for="birthday">Disable </label>
        </div>
        <div className="datePickerDiv">
          <label for="birthday" className="datepicker-label">
            Birthday:
          </label>
          <input
            type="month"
            id="birthday"
            name="birthday"
            disabled={disableDateWatched}
          />
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="Bike"
            className="input-margin-left"
            onClick={() => {
              var ele = document.getElementById("vehicle1");
              console.log("entering");
              console.log(ele);
              setDisableDateWatched(!disableDateWatched);
            }}
          />
          <label for="birthday">Disable</label>
        </div>
        <div className="button-container">
          <button
            onClick={async () => {
              var e = document.getElementById("cars");
              var selectedRating = e.options[e.selectedIndex].text;
              var date = document.getElementById("birthday");
              const dateArray = date.value.split("-");
              console.log(dateArray);

              console.log(user);

              try {
                const res = await axios.post(
                  `http://localhost:5000/post/${listType}`,
                  {
                    name:
                      listType == "series" || listType == "game"
                        ? selectedItem.name
                        : selectedItem.title,
                    rating: selectedRating,
                    dateWatched: dateArray,
                    image: getImage(),
                    username: user,
                    disable: {
                      isRatingDisabled: disableRating,
                      isDateWatchedDisabled:
                        disableDateWatched || dateArray.length === 1,
                    },
                    date: new Date(),
                  },
                  {
                    headers: {
                      headers: { "Content-Type": "application/json" },
                    },
                  }
                );

                console.log(res.data);

                if (res) {
                  fetchAllCards();
                }
              } catch (err) {
                console.log(err);
                //console.log(err.response.data);
              }

              console.log(dateArray);

              let obj = {
                name: selectedItem.title,
                rating: selectedRating,
                image: imageSrc,
                dateWatched: dateArray,
                isRatingDisabled: disableRating,
                isDateWatchedDisabled: disableDateWatched,
              };
              console.log("hello");
              setOpenModal(false);
              setSearchedValue("");
            }}
          >
            Add to
          </button>
        </div>
      </div>
      <div className="home-page-div">
        <div className="navbar">
          <div className="searchDiv">
            <div className="wrapper">
              <input
                className="search-field"
                onKeyDown={handleKeyDown}
                onChange={debouncedChange}
              />
              <i
                className="fa fa-search search-bar"
                aria-hidden="true"
                onClick={handleClick}
              ></i>
            </div>
            {recommendedList &&
              searchedValue.length > 2 &&
              recommendedList.length > 0 && (
                <div className="search-recommendations">
                  {recommendedList.map((singleSelectedItem) => {
                    return (
                      <div
                        className="recommendDiv"
                        key={
                          listType == "anime"
                            ? singleSelectedItem.mal_id
                            : singleSelectedItem.id
                        }
                        onClick={() =>
                          handleRecommendationClick(singleSelectedItem)
                        }
                      >
                        {listType == "anime" || listType == "movie"
                          ? singleSelectedItem.title
                          : singleSelectedItem.name}
                      </div>
                    );
                  })}
                </div>
              )}
          </div>
        </div>
        <div className="sortByContainer">
          <div className="sortByWrapper">
            <label className="rating-label">Sort By</label>
            <select name="sort" id="sort" onChange={handleSort}>
              <option value="dateAddedOldToNew">Date Added (old to new)</option>
              <option value="dateAddedNewToOld">Date Added (new to old)</option>
              <option value="ratingHighToLow">Rating (High to Low)</option>
              <option value="ratingLowToHigh">Rating (Low to High)</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
          <div className="totalItems">Total Items - {userList.length}</div>
        </div>
        <section className="section">
          {userList.map((userAnime) => {
            return (
              <Card
                searchedValue={userAnime.name}
                animeRating={userAnime.rating}
                animeImage={userAnime.image}
                dateWatched={userAnime.dateWatched}
                disable={userAnime.disable}
                user={user}
                listType={listType}
              />
            );
          })}
        </section>
      </div>
    </>
  );
}

export default Anime;
