const express = require("express");
const dotenv = require("dotenv").config();

const { errorHandler } = require("./middleware/errorModdleware");

// init app
const app = express();

app.use("/api/goals", require("./routes/goalRoutes"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server runs on port: ${port}`));
