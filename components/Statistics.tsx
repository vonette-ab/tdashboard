
"use client";
import { useState } from "react";

const categories = [
  { label: "Money transfer", color: "#7c5cfc", value: 28 },
  { label: "Café & Restaurants", color: "#b39dfc", value: 22 },
  { label: "Rent", color: "#e0d9ff", value: 18 },
  { label: "Education", color: "#c9bbfc", value: 12 },
  { label: "Food & Groceries", color: "#ede9ff", value: 12 },
  { label: "Others", color: "#f0eeff", value: 8 },
];

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function donutSlice(cx: number, cy: number, r: number, innerR: number, start: number, end: number) {
  const s = polarToCartesian(cx, cy, r, start);
  const e = polarToCartesian(cx, cy, r, end);
  const si = polarToCartesian(cx, cy, innerR, start);
  const ei = polarToCartesian(cx, cy, innerR, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y} L ${ei.x} ${ei.y} A ${innerR} ${innerR} 0 ${large} 0 ${si.x} ${si.y} Z`;
}

export default function Statistics() {
  const [activeType, setActiveType] = useState("Expense");
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  const cx = 90, cy = 90, r = 72, innerR = 48;
  
  // Pre-calculate start/end angles for each slice — avoids mutating a variable during render
  const sliceAngles = categories.map((cat, i) => {
    const prior = categories.slice(0, i).reduce((sum, c) => sum + c.value, 0);
    return {
      startAngle: prior * 3.6,
      endAngle: (prior + cat.value) * 3.6,
    };
  });

  return (
    <div>
      <div className="stat-panel-header">
        <span className="chart-title">Statistics</span>
        <div className="stat-panel-selectors">
          {["Expense", "Income"].map(t => (
            <button
              key={t}
              className="mini-selector"
              style={activeType === t ? { borderColor: "var(--purple)", background: "var(--purple-light)", color: "var(--purple)" } : {}}
              onClick={() => setActiveType(t)}
            >
              {t}
            </button>
          ))}
          <button className="mini-selector">Details ›</button>
        </div>
      </div>

      <p className="stat-panel-note">
        You have an increase of expenses in several categories this month.
      </p>

      <div className="donut-wrapper">
        <div style={{ position: "relative", width: 180, height: 180 }}>
          <svg viewBox="0 0 180 180" width="180" height="180">
            {categories.map((cat, i) => {
              const { startAngle, endAngle } = sliceAngles[i];
              const path = donutSlice(cx, cy, hoveredSlice === i ? r + 5 : r, innerR, startAngle, endAngle - 1);
              return (
                <path
                  key={i}
                  d={path}
                  fill={cat.color}
                  style={{ transition: "d 0.2s", cursor: "pointer" }}
                  onMouseEnter={() => setHoveredSlice(i)}
                  onMouseLeave={() => setHoveredSlice(null)}
                />
              );
            })}
          </svg>
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            textAlign: "center",
            pointerEvents: "none",
          }}>
            {hoveredSlice !== null ? (
              <>
                <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>{categories[hoveredSlice].label}</div>
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.1rem" }}>
                  {categories[hoveredSlice].value}%
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>This month expense</div>
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.25rem", lineHeight: 1.1 }}>
                  $6,222<span style={{ fontSize: "0.75rem", opacity: 0.55 }}>.00</span>
                </div>
                <div style={{ fontSize: "0.65rem", marginTop: 2, color: "var(--red)", fontWeight: 700 }}>40%</div>
              </>
            )}
          </div>
        </div>

        <div className="legend-list">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="legend-list-item"
              style={{ cursor: "pointer", opacity: hoveredSlice !== null && hoveredSlice !== i ? 0.45 : 1, transition: "opacity 0.2s" }}
              onMouseEnter={() => setHoveredSlice(i)}
              onMouseLeave={() => setHoveredSlice(null)}
            >
              <span className="legend-list-dot" style={{ background: cat.color, border: "1.5px solid #ccc" }} />
              {cat.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
