
export default function SuccessPopup({ message, subtext }: { message: string; subtext: string }) {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        background: "white",
        borderRadius: "12px",
        padding: "40px",
        textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <div style={{ fontSize: "48px" }}>✅</div>
        <h2 style={{ margin: "16px 0 8px" }}>{message}</h2>
        <p style={{ color: "#666" }}>{subtext}</p>
      </div>
    </div>
  );
}