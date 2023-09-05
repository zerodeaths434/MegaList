import React, { useState } from "react";
import "./Card.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import star from "./OrangeStar.svg";

function Card({
  searchedValue,
  animeRating,
  animeImage,
  dateWatched,
  disable,
  user,
  listType,
}) {
  const [deleteCardModal, setDeleteCardModal] = useState(false);
  const [editCardModal, setEditCardModal] = useState(false);
  const [newDisableRating, setNewDisableRating] = useState(false);
  const [newDisableDateWatched, setNewDisableDateWatched] = useState(false);
  let { userId } = useParams();

  const handleDelete = () => {
    try {
      axios.delete(`http://localhost:5000/post/delete/${listType}`, {
        headers: {
          name: encodeURI(searchedValue),
          username: user,
        },
      });
      toast.success("Deleted Successfully");
      setTimeout(() => window.location.reload(), 1200);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    var e = document.getElementById("updatedRating");
    var newSelectedRating = e.options[e.selectedIndex].text;
    var newDateWatched = document.getElementById("updatedDateWatched");
    const dateArray = newDateWatched.value.split("-");

    try {
      const resdata = await axios.put(
        `http://localhost:5000/post/update/${listType}`,
        {},
        {
          headers: {
            username: user,
            newrating: newSelectedRating,
            newdatewatched: dateArray,
            name: encodeURI(searchedValue),
            isratingdisabled: newDisableRating,
            disabledatewatch: newDisableDateWatched,
          },
        }
      );

      if (resdata) {
        toast.success("Edited Successfully");
        setTimeout(() => window.location.reload(), 1200);
      }
    } catch (err) {
      console.log(err);
    }
  };

  var starArr = [];
  for (let i = 0; i < animeRating; i++) {
    starArr.push(
      <img
        src={star}
        key={i}
        style={{ width: "15px", height: "15px", color: "orange" }}
        alt="Orange star"
      />
    );
  }

  const openDeleteCardModal = () => {
    if (user) {
      setDeleteCardModal(!deleteCardModal);
    }
  };

  const openEditCardModal = () => {
    if (user) {
      setEditCardModal(!editCardModal);
    }
  };

  /* console.log(searchedValue);
  console.log(disable.isDateWatchedDisabled);*/
  return (
    <div
      className={listType === "game" ? "card gameCardWidth" : "card cardWidth"}
    >
      <div
        className={`${
          deleteCardModal || editCardModal ? "cardModal" : "cardModal hideCard"
        }`}
      >
        <div className="cardModalDiv">
          {editCardModal ? (
            <>
              <div className="editRatingDiv">
                <i
                  className="fa fa-times editClose"
                  aria-hidden="true"
                  onClick={openEditCardModal}
                ></i>
                <label for="cars" className="rating-label">
                  Rating
                </label>
                <div className="checkboxDisableWrapper">
                  <select
                    name="updatedRating"
                    id="updatedRating" /*disabled={disableRating}*/
                  >
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
                    onClick={() => setNewDisableRating(!newDisableRating)}
                  />
                  <label for="birthday">Disable </label>
                </div>
              </div>
              <div className="editRatingDiv">
                <label for="birthday" className="datepicker-label">
                  Date Watched:
                </label>
                <div className="checkboxDisableWrapper">
                  <input
                    type="month"
                    id="updatedDateWatched"
                    name="updatedDateWatched"
                    /* disabled={disableDateWatched}*/
                    style={{ width: "130px" }}
                  />
                  <input
                    type="checkbox"
                    id="vehicle1"
                    name="vehicle1"
                    value="Bike"
                    onClick={() => {
                      var ele = document.getElementById("vehicle1");
                      console.log("entering");
                      console.log(ele);
                      setNewDisableDateWatched(!newDisableDateWatched);
                    }}
                  />
                  <label for="birthday">Disable</label>
                </div>
              </div>
              <div className="updateBtnContainer">
                <button onClick={handleUpdate}>Update</button>
              </div>
            </>
          ) : (
            <>
              <div className="deleteDiv">
                You sure want to delete this item?
              </div>
              <i
                className="fa fa-times editClose"
                aria-hidden="true"
                onClick={() => setDeleteCardModal(!deleteCardModal)}
              ></i>
              <div className="deleteBtnContainer">
                <button className="noDeleteBtn" onClick={openDeleteCardModal}>
                  No
                </button>
                <button className="yesDeleteBtn" onClick={handleDelete}>
                  Yes
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {user === userId && (
        <>
          <i
            className="fa-regular fa-square-minus deleteContainer"
            onClick={openDeleteCardModal}
          ></i>
          <i
            className="fa-regular fa-pen-to-square editContainer"
            onClick={openEditCardModal}
          ></i>
        </>
      )}
      <div
        className={
          listType === "game"
            ? "card-image-container"
            : "card-image-container mt10"
        }
      >
        <img
          src={animeImage}
          alt="Card"
          style={
            listType === "game"
              ? { width: "100%", borderRadius: "3% 3% 0 0" }
              : { width: "200px" }
          }
        />
      </div>
      <div className="card-animeTitle">{searchedValue}</div>
      {!disable.isRatingDisabled && (
        <div className="card-ratingsDiv">{starArr}</div>
      )}
      {!disable.isDateWatchedDisabled && dateWatched[1] && (
        <div className="card-datePickerDiv">
          COMPLETED ON {dateWatched[1] + "-" + dateWatched[0]}
        </div>
      )}
    </div>
  );
}

export default Card;
