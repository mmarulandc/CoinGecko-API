const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./config/database");
const auth = require("./routes/auth");
const app = express();


const port = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/api/auth", auth);
// app.use("api/login");


app.listen(port, () => {
  console.log(`App listening in port ${port}`);
});


app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});


module.exports = app;