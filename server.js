const express = require("express");
const Database = require("better-sqlite3");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));
app.use(express.json());


// =======================
// CONNECT SQLITE
// =======================
const db = new Database("database.db");

console.log("SQLite Connected ✅");


// =======================
// CREATE TABLE
// =======================
db.prepare(`
  CREATE TABLE IF NOT EXISTS content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fact TEXT,
    joke TEXT
  )
`).run();


// =======================
// SAVE DATA
// =======================
app.post("/save", (req, res) => {

  let fact = req.body.fact || "";
  let joke = req.body.joke || "";

  if (!fact && !joke) {
    return res.status(400).send("No data to save");
  }

  const stmt = db.prepare(`
    INSERT INTO content (fact, joke)
    VALUES (?, ?)
  `);

  const info = stmt.run(fact, joke);

  res.status(200).json({
    message: "Saved successfully ✅",
    id: info.lastInsertRowid
  });

});

// =======================
// GET SAVED DATA
// =======================
app.get("/data", (req, res) => {

  const rows = db.prepare("SELECT * FROM content").all();

  res.json(rows);

});


app.get("/download-db", (req, res) => {

  const filePath = "./database.db";

  res.download(filePath, "database.db", (err) => {

    if (err) {
      console.log("Download Error:", err);
      res.status(500).send("Could not download file");
    }

  });

});


// =======================
// SERVER
// =======================
const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});