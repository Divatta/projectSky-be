const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDb = require("./db");
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(`/api/v1/`, require("./route/contactUsRoute"));

app.all("*", (req, res, next) => {
    res.status(404).json({ msg: `requested path not found, try '/api/v1/'` });
    next();
  });

const start = async () => {
    try {
      app.listen(PORT, () => {
        console.log(`Server is listening to port ${PORT}...`);
      });
      await connectDb(process.env.MONGO_URL);
      console.log("Connected to MongoDB...");
    } catch (error) {
      console.log(error);
    }
};
  
start();