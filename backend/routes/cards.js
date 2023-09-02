const express = require("express");
const bcrypt = require("bcrypt");
const {
  AnimeCard,
  MovieCard,
  SeriesCard,
  GameCard,
} = require("../model/cardDetails");

const router = express.Router();

/*router.post("/anime", async (req, res) => {
  const newAnimeCard = new AnimeCard(req.body);
  try {
    const ifexist = await AnimeCard.findOne({
      name: req.body.name,
      username: req.body.username,
    });
    if (ifexist) {
      res.status(500).json({ message: "Already exists" });
    } else {
      const saveNewCard = await newAnimeCard.save();
      res.status(200).json(saveNewCard);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/movie", async (req, res) => {
  const newMovieCard = new MovieCard(req.body);

  try {
    const ifexist = await MovieCard.findOne({
      name: req.body.name,
      username: req.body.username,
    });
    if (ifexist) {
      res.status(500).json({ message: "Already exists" });
    } else {
      const saveNewCard = await newMovieCard.save();
      res.status(200).json(saveNewCard);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/series", async (req, res) => {
  const newSeriesCard = new SeriesCard(req.body);
  console.log(newSeriesCard);
  try {
    const ifexist = await SeriesCard.findOne({
      name: req.body.name,
      username: req.body.username,
    });
    if (ifexist) {
      res.status(500).json({ message: "Already exists" });
    } else {
      const saveNewCard = await newSeriesCard.save();
      res.status(200).json(saveNewCard);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/game", async (req, res) => {
  const newGameCard = new GameCard(req.body);
  console.log(newGameCard);
  try {
    const ifexist = await GameCard.findOne({
      name: req.body.name,
      username: req.body.username,
    });
    if (ifexist) {
      res.status(500).json({ message: "Already exists" });
    } else {
      const saveNewCard = await newGameCard.save();
      res.status(200).json(saveNewCard);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});*/

router.put("/update/:id", async (req, res) => {
  const username = req.headers["username"];
  const name = decodeURI(req.headers["name"]);
  const newRating = req.headers["newrating"];
  const newDateWatched = req.headers["newdatewatched"];
  const newIsRatingDisabled = req.headers["isratingdisabled"] || false;
  const newIsDateWatchedDisabled = req.headers["disabledatewatch"] || false;
  const newDateWatchedArray = newDateWatched.split(",");
  console.log(newDateWatchedArray);

  try {
    const filter = {
      name: name,
      username: username,
    };

    const updateValues = {
      rating: newRating,
      dateWatched: newDateWatchedArray,
      $set: {
        "disable.isRatingDisabled": newIsRatingDisabled,
        "disable.isDateWatchedDisabled": newIsDateWatchedDisabled,
      },
    };
    switch (req.params.id) {
      case "anime":
        const animeCard = await AnimeCard.findOneAndUpdate(
          filter,
          updateValues,
          { new: true }
        );

        if (animeCard) {
          res.status(200).json(animeCard);
        }
        break;
      case "movie":
        const movieCard = await MovieCard.findOneAndUpdate(
          filter,
          updateValues,
          { new: true }
        );

        if (movieCard) {
          res.status(200).json(movieCard);
        }
        break;
      case "series":
        const seriesCard = await SeriesCard.findOneAndUpdate(
          filter,
          updateValues,
          { new: true }
        );

        if (seriesCard) {
          res.status(200).json(seriesCard);
        }
        break;
      case "game":
        const gameCard = await GameCard.findOneAndUpdate(filter, updateValues, {
          new: true,
        });

        if (gameCard) {
          res.status(200).json(gameCard);
        }
        break;
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/:id", async (req, res) => {
  const username = req.headers["username"];
  try {
    let ifexist;
    switch (req.params.id) {
      case "anime":
        const newAnimeCard = new AnimeCard(req.body);
        ifexist = await AnimeCard.findOne({
          name: req.body.name,
          username: req.body.username,
        });
        if (ifexist) {
          res
            .status(500)
            .json({ message: "Error: Anime Already in Your Collection" });
        } else {
          const saveNewCard = await newAnimeCard.save();
          res.status(200).json(saveNewCard);
        }
        return;

      case "movie":
        const newMovieCard = new MovieCard(req.body);
        ifexist = await MovieCard.findOne({
          name: req.body.name,
          username: req.body.username,
        });
        if (ifexist) {
          res.status(500).json({ message: "Movie Already in Your Collection" });
        } else {
          const saveNewCard = await newMovieCard.save();
          res.status(200).json(saveNewCard);
        }
        return;
      case "series":
        const newSeriesCard = new SeriesCard(req.body);
        ifexist = await SeriesCard.findOne({
          name: req.body.name,
          username: req.body.username,
        });
        if (ifexist) {
          res
            .status(500)
            .json({ message: "Series Already in Your Collection" });
        } else {
          const saveNewCard = await newSeriesCard.save();
          res.status(200).json(saveNewCard);
        }
        return;
      case "game":
        const newGameCard = new GameCard(req.body);
        ifexist = await GameCard.findOne({
          name: req.body.name,
          username: req.body.username,
        });
        if (ifexist) {
          res.status(500).json({ message: "Game Already in Your Collection" });
        } else {
          const saveNewCard = await newGameCard.save();
          res.status(200).json(saveNewCard);
        }
        return;
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  const username = req.headers["username"];

  try {
    let posts;
    if (username) {
      switch (req.params.id) {
        case "anime":
          posts = await AnimeCard.find({ username: username });
          return res.status(200).json(posts);
        case "movie":
          posts = await MovieCard.find({ username: username });
          return res.status(200).json(posts);
        case "series":
          posts = await SeriesCard.find({ username: username });
          return res.status(200).json(posts);
        case "game":
          posts = await GameCard.find({ username: username });
          return res.status(200).json(posts);
      }
      if (!posts) {
        return res.status(404).json({ message: "This is error message" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const username = req.headers["username"];
  const moviename = decodeURI(req.headers["name"]);

  try {
    let deletedMovie = "";
    switch (req.params.id) {
      case "anime":
        deletedMovie = await AnimeCard.findOneAndDelete({
          name: moviename,
          username: username,
        });
        return res.status(200).json("Post has been deleted");
      case "movie":
        deletedMovie = await MovieCard.findOneAndDelete({
          name: moviename,
          username: username,
        });
        return res.status(200).json("Post has been deleted");
      case "series":
        deletedMovie = await SeriesCard.findOneAndDelete({
          name: moviename,
          username: username,
        });
        return res.status(200).json("Post has been deleted");
      case "game":
        deletedMovie = await GameCard.findOneAndDelete({
          name: moviename,
          username: username,
        });
        return res.status(200).json("Post has been deleted");
    }

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
