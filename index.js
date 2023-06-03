require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// APP CONFIG
const app = express();
app.use(express.json());

// APP LISTEN
const port = process.env.PORT;
app.listen(port, () => {
  console.log(" 🟢 Server is running on port " + port);
});

// DATABASE CONFIG
mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection;
database.on("error", (error) => console.log(error));
database.once("open", () =>
  console.log(" 🟢 Successfully connected to database ")
);

// ROUTES
const teacherRoutes = require("./routes/teachersRoutes");
app.use("/teachers", teacherRoutes);
