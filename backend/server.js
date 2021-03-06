const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

const { errorHandler } = require("./middleware/errorMiddleware");

// init database
connectDB();

// init app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server runs on port: ${port}`);
});
