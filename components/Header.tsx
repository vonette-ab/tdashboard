"use client";

import { Search, Bell, Calendar } from "lucide-react";


interface HeaderProps {
  onClick?: () => void;
}


export default function Header({ onClick }: HeaderProps) {

  
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "18px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

       
        <div
          style={{
            background: "#fff",
            padding: 8,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Calendar size={18} style={{ color: "#000" }} />
        </div>

        <div>
          <div style={{ fontWeight: 700, fontSize: 30, letterSpacing: -0.3 }}>
            Analytics
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: 1,
            }}
          >
            Detailed overview of your financial situation
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>

        <div
          style={{
            background: "#fff",
            padding: 8,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Search size={18} style={{ color: "#000" }} />
        </div>

        <div
          style={{
            background: "#fff",
            padding: 8,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Bell size={18} style={{ color: "#000" }} />
        </div>

        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.3)",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          Adaline Lively
        </div>

        <button
          onClick={onClick}
          style={{
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: 10,
            padding: "10px 12px",
            width: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 600,
            color: "#000",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}></span>
          Manage widgets
        </button>

        
        <button
          onClick={onClick}
          style={{
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: 10,
            padding: "10px 12px",
            width: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 600,
            color: "#000",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span>
          Add a widget
        </button>

      </div>
    </div>
  );
}

