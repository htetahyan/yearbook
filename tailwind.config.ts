import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      height: {
        page: "calc(100vh - 64px)",
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 35px rgba(255, 255,255, 0.2)"
        ],
        smallGlow: [
          "0 0px 10px rgba(255,255, 255, 0.35)",
          "0 0px 15px rgba(255, 255,255, 0.2)"
        ]
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        primary: ["var(--font-juma)"],
        secondary: ["var(--font-rog-bold)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
