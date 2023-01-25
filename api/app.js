const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const notifications = [
  {
    id: "1",
    message: "Grades posted for 'Intro to Python' assignment",
    date: "1/25/2023",
  },
  {
    id: "2",
    message: "Reminder: Final exam is next week",
    date: "1/24/2023",
  },
  {
    id: "3",
    message: "New discussion posted in 'Data Structures'",
    date: "1/23/2023",
  },
];
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.static(path.join(__dirname, "src")));

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.get("/api/notifications", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(notifications);
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
