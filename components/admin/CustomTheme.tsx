"use client"

import { defaultTheme } from "react-admin"
import { createTheme } from "@mui/material/styles"
import merge from "lodash/merge"

export const CustomTheme = createTheme(
  merge({}, defaultTheme, {
    palette: {
      mode: "dark",
      primary: {
        main: "#5eead4", // teal color from your site
      },
      secondary: {
        main: "#a855f7", // purple color from your site
      },
      background: {
        default: "#0f172a", // dark blue background
        paper: "#1e293b", // slightly lighter blue for cards
      },
      text: {
        primary: "#e2e8f0",
        secondary: "#94a3b8",
      },
      error: {
        main: "#f43f5e", // rose color from your site
      },
      warning: {
        main: "#f59e0b", // amber color from your site
      },
      info: {
        main: "#3b82f6", // blue color
      },
      success: {
        main: "#10b981", // green color
      },
    },
    typography: {
      fontFamily: '"Inter", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 500,
            variants: [],
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
            variants: [],
          },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: {
            padding: "16px 24px",
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: "24px",
            "&:last-child": {
              paddingBottom: "24px",
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          },
          head: {
            fontWeight: 600,
          },
        },
      },
    },
  }),
)

