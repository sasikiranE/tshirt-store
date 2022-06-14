const mongoose = require("mongoose");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/store")
  .then(() => {
    console.log("Database connected successfully...");
  })
  .catch((err) => {
    console.log("Database connection FAILED...");
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
