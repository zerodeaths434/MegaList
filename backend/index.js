const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const cardRoute = require("./routes/cards");
const PORT = process.env.PORT || 5000;

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("MongoDb connected"))
  .catch((err) => console.log(err));

app.use("/auth", authRoute);
app.use("/post", cardRoute);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
