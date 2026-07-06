import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SOR ONE — Sites e sistemas para pequenos negócios";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(180deg, #060709 0%, #0a0c10 55%, #060709 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 120,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "#C9A86A",
          }}
        >
          SOR ONE
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 36,
            fontWeight: 400,
            color: "#9A9DA6",
          }}
        >
          Sites e sistemas para pequenos negócios
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            width: 220,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #C9A86A, transparent)",
          }}
        />
      </div>
    ),
    size,
  );
}
