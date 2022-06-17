require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const users = require("./routes/users");
const auth = require("./routes/auth");

if (!process.env.JWT_PRIVATE_KEY) {
  console.log("FATAL ERROR: JWT_PRIVATE_KEY is not set...");
  process.exit(1);
}

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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
