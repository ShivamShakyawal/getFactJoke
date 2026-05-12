const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));


// =======================
// CONNECT DATABASE
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
// SAVE ROUTE
// =======================
app.post("/save", (req, res) => {

  try {

    let fact = req.body.fact || "";
    let joke = req.body.joke || "";

    if (!fact && !joke) {
      return res.status(400).json({
        message: "No data to save"
      });
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

  } catch(err) {

    console.error(err);

    res.status(500).json({
      message: "Database Error"
    });

  }

});


// =======================
// GET DATA
// =======================
app.get("/data", (req, res) => {

  const rows = db.prepare(`
    SELECT * FROM content
  `).all();

  res.json(rows);

});


// =======================
// SERVER
// =======================
const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
