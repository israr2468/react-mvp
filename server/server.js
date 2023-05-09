const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  //  ssl: { rejectUnauthorized: false },
});

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Passed" });
});

app.get("/api/todos", (req, res) => {
  pool.query(`SELECT * FROM todo;`).then((result) => {
    res.json(result.rows);
  });
});
app.post("/api/todos", (req, res) => {
  const { name, due_date } = req.body;
  if (!name || !due_date) {
    res.status(400).json({ error: "Missing required field" });
  } else {
    pool
      .query("INSERT INTO todo (name, due_date) VALUES ($1, $2) RETURNING *", [
        name,
        due_date,
      ])
      .then((result) => {
        res.status(201).json(result.rows[0]);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
});

app.get("/api/todos/:id", (req, res) => {
  const todoId = req.params.id;
  pool
    .query("SELECT * FROM todo WHERE id = $1", [todoId])
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Todo not found" });
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.patch("/api/todos/:id", (req, res) => {
  const todoId = req.params.id;
  const { name } = req.body;
  pool
    .query("UPDATE todo SET name=$1 WHERE id=$2", [name, todoId])
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({ error: `Todo with ID ${todoId} not found` });
      } else {
        res.json({ message: `Todo with ID ${todoId} updated successfully` });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.put("/api/todos/:id", (req, res) => {
  const todoId = req.params.id;
  const { name, due_date } = req.body;
  pool
    .query("UPDATE todo SET name=$1, due_date=$2 WHERE id=$3", [
      name,
      due_date,
      todoId,
    ])
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({ error: `Todo with ID ${todoId} not found` });
      } else {
        res.json({ message: `Todo with ID ${todoId} updated successfully` });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.delete("/api/todos/:id", (req, res) => {
  const todoId = req.params.id;
  pool
    .query("DELETE FROM todo WHERE id = $1", [todoId])
    .then((result) => {
      res.status(201).json("Item successfully deleted.");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
