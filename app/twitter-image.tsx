import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "CodeWithToni"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 128,
        background: "linear-gradient(to bottom, #0f172a, #1e293b)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        fontWeight: 600,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3))",
        }}
      >
        <span
          style={{
            color: "#5eead4",
            fontSize: 148,
            marginRight: "8px",
          }}
        >
          {"{"}
        </span>
        <span>
          <span style={{ color: "#5eead4" }}>code</span>
          <span style={{ color: "white" }}>WithToni</span>
        </span>
        <span
          style={{
            color: "#5eead4",
            fontSize: 148,
            marginLeft: "8px",
          }}
        >
          {"}"}
        </span>
      </div>
      <div
        style={{
          fontSize: 36,
          color: "#94a3b8",
          marginTop: 40,
          maxWidth: "80%",
          textAlign: "center",
        }}
      >
        Web Development & Technical Solutions
      </div>
    </div>,
    // ImageResponse options
    {
      ...size,
    },
  )
}

