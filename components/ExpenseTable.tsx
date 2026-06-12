
"use client";
import { useState } from "react";

type ExpenseRow = {
  id: number;
  amount: number;
  category: string;
};

const initialExpenseData: ExpenseRow[] = [
  { id: 1, amount: 200, category: "Food" },
  { id: 2, amount: 50, category: "Transport" },
  { id: 3, amount: 900, category: "Rent" },
];

export default function ExpenseTable() {
  const [rows, setRows] = useState<ExpenseRow[]>(initialExpenseData);
  const [showModal, setShowModal] = useState(false);
  const [editingRow, setEditingRow] = useState<ExpenseRow | null>(null);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  let nextId = rows.length ? Math.max(...rows.map(r => r.id)) + 1 : 1;

  const openAdd = () => {
    setEditingRow(null);
    setAmount("");
    setCategory("Food");
    setShowModal(true);
  };

  const openEdit = (row: ExpenseRow) => {
    setEditingRow(row);
    setAmount(String(row.amount));
    setCategory(row.category);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!amount) return;
    if (editingRow) {
      setRows(rows.map(r =>
        r.id === editingRow.id
          ? { ...r, amount: parseFloat(amount), category }
          : r
      ));
    } else {
      setRows([...rows, { id: nextId, amount: parseFloat(amount), category }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setRows(rows.filter(r => r.id !== id));
  };

  return (
    <div style={{ position: "relative" }}>

      {/* MODAL */}
      {showModal && (
        <div style={{
          position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
        }}>
          <div style={{
            background: "white", borderRadius: "12px",
            padding: "24px", width: "340px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          }}>
            <h3 style={{ margin: "0 0 16px", fontSize: "16px" }}>
              {editingRow ? "Edit Expense" : "Add Expense"}
            </h3>

            <label style={{ fontSize: "13px", color: "#666" }}>Expense Amount</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="e.g. 100"
              style={{ width: "100%", marginBottom: "12px", padding: "8px", boxSizing: "border-box" }}
            />

            <label style={{ fontSize: "13px", color: "#666" }}>Expense Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            >
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Rent">Rent</option>
              <option value="Freelance">Freelance</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
            </select>

            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "20px" }}>
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleSave} style={{ background: "#111", color: "white", border: "none", padding: "8px 16px", borderRadius: "8px" }}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP BAR */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h2 style={{ margin: 0, fontSize: "18px" }}>Expense Records</h2>
        <button
          onClick={openAdd}
          style={{ background: "#111", color: "white", border: "none", padding: "9px 16px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
        >
          + Add Expense
        </button>
      </div>

      {/* TABLE */}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
            <th style={th}>ID</th>
            <th style={th}>Expense Amount</th>
            <th style={th}>Expense Category</th>
            <th style={th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id} style={{ borderBottom: "0.5px solid #f3f4f6" }}>
              <td style={td}>{row.id}</td>
              <td style={{ ...td, color: "#dc2626", fontWeight: 500 }}>
                GHS {row.amount.toLocaleString("en-GH", { minimumFractionDigits: 2 })}
              </td>
              <td style={td}>{row.category}</td>
              <td style={td}>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    onClick={() => openEdit(row)}
                    style={{ padding: "5px 12px", background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row.id)}
                    style={{ padding: "5px 12px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {rows.length === 0 && (
        <p style={{ textAlign: "center", color: "#999", padding: "32px 0" }}>
          No expense records yet. Click "Add Expense" to get started.
        </p>
      )}
    </div>
  );
}

const th: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: "12px", color: "#6b7280", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" };
const td: React.CSSProperties = { padding: "12px 14px" };