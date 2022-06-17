require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const users = require("./routes/users");
const auth = require("./routes/auth");

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database connected successfully...");
  })
  .catch((err) => {
    console.log("Database connection FAILED...");
  });

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
