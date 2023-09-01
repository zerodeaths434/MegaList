const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  dateWatched: {
    type: Array,
  },
  image: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  disable: {
    isRatingDisabled: {
      type: Boolean,
      required: true,
    },
    isDateWatchedDisabled: {
      type: Boolean,
      required: true,
    },
  },
  date: {
    type: Date,
    required: true,
  },
});

const AnimeCard = mongoose.model("Anime", cardSchema);
const MovieCard = mongoose.model("Movies", cardSchema);
const SeriesCard = mongoose.model("Series", cardSchema);
const GameCard = mongoose.model("Games", cardSchema);

module.exports = { AnimeCard, MovieCard, SeriesCard, GameCard };
