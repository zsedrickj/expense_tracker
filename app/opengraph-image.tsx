import { ImageResponse } from "next/og";

export const alt = "ExpenseTracker — Budget and Expense Tracking";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#07150e",
          color: "white",
          display: "flex",
          fontFamily: "sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div style={{ alignItems: "center", display: "flex", gap: "20px" }}>
            <div
              style={{
                alignItems: "center",
                background: "#22c55e",
                borderRadius: "999px",
                color: "#07150e",
                display: "flex",
                fontSize: "48px",
                fontWeight: 800,
                height: "84px",
                justifyContent: "center",
                width: "84px",
              }}
            >
              $
            </div>
            <span style={{ fontSize: "42px", fontWeight: 700 }}>ExpenseTracker</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "76px",
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            <span>Track your money.</span>
            <span>Master your future.</span>
          </div>
          <div style={{ color: "#a7f3d0", fontSize: "30px" }}>
            Budget and expense tracking made simple.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
