const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));
app.use(express.json());


// =======================
// CONNECT SQLITE
// =======================
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("SQLite Connected ✅");
  }
});


// =======================
// CREATE TABLE
// =======================
db.run(`
  CREATE TABLE IF NOT EXISTS content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fact TEXT,
    joke TEXT
  )
`);


// =======================
// SAVE DATA
// =======================
app.post("/save", (req, res) => {

  let fact = req.body.fact || "";
  let joke = req.body.joke || "";

  if (!fact && !joke) {
    return res.status(400).send("No data to save");
  }

  const sql = `
    INSERT INTO content (fact, joke)
    VALUES (?, ?)
  `;

  db.run(sql, [fact, joke], function(err) {

    if (err) {
      console.error(err);
      return res.status(500).send("DB Error");
    }

    res.status(200).json({
      message: "Saved successfully ✅",
      id: this.lastID
    });

  });

});


// =======================
// GET SAVED DATA
// =======================
app.get("/data", (req, res) => {

  db.all("SELECT * FROM content", [], (err, rows) => {

    if (err) {
      return res.status(500).send(err);
    }

    res.json(rows);

  });

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