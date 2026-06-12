
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
        padding: "8px 22px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 0,
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

       
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
          <Calendar size={22} style={{ color: "#000" }} />
        </div>

        <div>
          <div style={{ fontWeight: 300, fontSize: 10, letterSpacing: -0.3 }}>
            Analytics
           <h3>Detailed Overview of your finanacial situation</h3> 
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
          <Search size={15} style={{ color: "#000" }} />
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
         <div>
          <Bell size={15} style={{ color: "#000" }} />
        
          </div>
          <div style={{ fontWeight: 300, fontSize: 10, letterSpacing: -0.3 }}></div>
          </div>


        <button
          onClick={onClick}
          style={{
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: 6,
            padding: "10px 12px",
            width: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            cursor: "pointer",
            fontSize: 10,
            fontWeight: 300,
            color: "#000",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          <span style={{ fontSize: 10, lineHeight: 1 }}></span>
          Manage widgets
        </button>

        
        <button
          onClick={onClick}
          style={{
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: 10,
            padding: "10px 12px",
            width: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            cursor: "pointer",
            fontSize: 10,
            fontWeight: 300,
            color: "#000",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          <span style={{ fontSize: 10, lineHeight: 1 }}>+</span>
          Add a widget
        </button>

      </div>
    </div>
  );
}

