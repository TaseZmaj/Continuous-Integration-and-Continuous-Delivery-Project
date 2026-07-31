import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  //Backend API functions ======================================

  async function loadItems() {
    const res = await fetch(`${API_URL}/items`);
    const data = await res.json();
    setItems(data);
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function addItem(e) {
    e.preventDefault();
    if (!name.trim()) return;

    await fetch(`${API_URL}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setName("");
    loadItems();
  }

  async function toggleItem(item) {
    await fetch(`${API_URL}/items/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !item.done }),
    });
    loadItems();
  }

  async function deleteItem(id) {
    await fetch(`${API_URL}/items/${id}`, { method: "DELETE" });
    loadItems();
  }

  // ===========================================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "2rem 1rem",
      }}
    >
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: 20,
          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
          padding: "2rem",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: "0.5rem", color: "#1e293b" }}>
          Simple CRUD App
        </h1>
        <p style={{ marginTop: 0, marginBottom: "1.25rem", color: "#64748b" }}>
          Add, complete, or remove tasks from your list.
        </p>

        <form
          onSubmit={addItem}
          style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem" }}
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item"
            style={{
              flex: 1,
              padding: "0.8rem 0.95rem",
              borderRadius: 10,
              border: "1px solid #cbd5e1",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.8rem 1rem",
              borderRadius: 10,
              border: "none",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </form>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.9rem 0",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <span
                style={{
                  textDecoration: item.done ? "line-through" : "none",
                  color: item.done ? "#94a3b8" : "#0f172a",
                  fontWeight: 500,
                }}
              >
                {item.name}
              </span>
              <div>
                <button
                  onClick={() => toggleItem(item)}
                  style={{
                    padding: "0.5rem 0.7rem",
                    borderRadius: 8,
                    border: "none",
                    background: item.done ? "#e2e8f0" : "#dcfce7",
                    color: item.done ? "#334155" : "#166534",
                    cursor: "pointer",
                    marginRight: "0.5rem",
                  }}
                >
                  {item.done ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  style={{
                    padding: "0.5rem 0.7rem",
                    borderRadius: 8,
                    border: "none",
                    background: "#fee2e2",
                    color: "#991b1b",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
