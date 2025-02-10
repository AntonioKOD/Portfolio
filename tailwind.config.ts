import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vivid: "#2CD4D9",
        indigo: "#3A3D98",
        pure: "#FFFFFF",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.indigo"),
              "&:hover": {
                color: theme("colors.vivid"),
              },
            },
            "h2, h3, h4": {
              color: theme("colors.indigo"),
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            code: {
              color: theme("colors.indigo"),
              backgroundColor: theme("colors.gray.100"),
              padding: "0.25rem 0.4rem",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },
            "pre code": {
              color: theme("colors.gray.200"),
              backgroundColor: "transparent",
              padding: 0,
            },
            pre: {
              backgroundColor: theme("colors.gray.800"),
              color: theme("colors.gray.200"),
              padding: "1rem",
              borderRadius: "0.5rem",
              overflow: "auto",
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.vivid"),
              "&:hover": {
                color: theme("colors.vivid"),
              },
            },
            "h2, h3, h4": {
              color: theme("colors.gray.100"),
            },
            code: {
              color: theme("colors.vivid"),
              backgroundColor: theme("colors.gray.800"),
            },
            pre: {
              backgroundColor: theme("colors.gray.900"),
              color: theme("colors.gray.200"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
}

export default config

