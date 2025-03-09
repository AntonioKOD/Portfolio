import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CodeWithToni",
    short_name: "CodeWithToni",
    description: "Web Development & Technical Solutions",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#5eead4",
    icons: [
      {
        src: "/icon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}

