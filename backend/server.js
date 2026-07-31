const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "appdb",
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      done BOOLEAN DEFAULT FALSE
    )
  `);
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/items", async (_req, res) => {
  const { rows } = await pool.query("SELECT * FROM items ORDER BY id ASC");
  res.json(rows);
});

app.post("/items", async (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }

  const { rows } = await pool.query(
    "INSERT INTO items (name) VALUES ($1) RETURNING *",
    [name.trim()],
  );
  res.status(201).json(rows[0]);
});

app.put("/items/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { done } = req.body;

  const { rows } = await pool.query(
    "UPDATE items SET done = COALESCE($1, NOT done) WHERE id = $2 RETURNING *",
    [done, id],
  );

  if (!rows.length) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.json(rows[0]);
});

app.delete("/items/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { rowCount } = await pool.query("DELETE FROM items WHERE id = $1", [
    id,
  ]);

  if (!rowCount) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.status(204).send();
});

(async () => {
  try {
    await initDb();
    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
