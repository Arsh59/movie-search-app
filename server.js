const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // allows frontend to access backend
app.use(express.json()); // to parse JSON data

const movies = [
  { id: 1, title: "Inception", year: 2010 },
  { id: 2, title: "Interstellar", year: 2014 },
];

// GET movies
app.get("/api/movies", (req, res) => {
  res.json(movies);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
