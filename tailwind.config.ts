import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      mobileS: "320px",
      mobileM: "375px",
      mobileL: "425px",
      mobileXL: "700px",
      tablet: "768px",
      laptop: "1024px",
      laptopM: "1310px",
      laptopL: "1440px",
      laptopXL: "2000px",
      "4K": "2560px"
    },
    extend: {
      colors: {
        primary: {
          100: "#d3dee4",
          200: "#a7bdca",
          300: "#7b9ba0",
          400: "#4f7a77",
          500: "#244855",  // Original colour
          600: "#1d3944",
          700: "#162a33",
          800: "#0f1b22",
          900: "#080d11"
        },
        accent: {
          100: "#f9d2cd",
          200: "#f3a69b",
          300: "#ec7b69",
          400: "#e64f37",
          500: "#E64833",  // Original colour
          600: "#b93929",
          700: "#8c2b1f",
          800: "#5e1c15",
          900: "#300e0a"
        },
        content: {
          100: "#e6d2cf",
          200: "#cda59f",
          300: "#b37770",
          400: "#9a4a40",
          500: "#874F41",  // Original colour
          600: "#6c3e33",
          700: "#522e26",
          800: "#371d19",
          900: "#1d0f0c"
        },
        neutral: {
          100: "#e2eeec",
          200: "#c5ddda",
          300: "#a7ccc9",
          400: "#8abbb7",
          500: "#90AEAD",  // Original colour
          600: "#6f8c8b",
          700: "#566d6d",
          800: "#3d4e4e",
          900: "#232f2f"
        },
        background: {
          100: "#fff5e8",
          200: "#ffebd2",
          300: "#fde1bb",
          400: "#fdd8a5",
          500: "#FBE9D0",  // Original colour
          600: "#dab69f",
          700: "#b88e7e",
          800: "#94655b",
          900: "#72403a"
        }
      },
      gridTemplateColumns: {
        "3.5": "repeat(3.5, minmax(0, 1fr))"
      },
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      // },
      keyframes: {
        bounceSlow: {
          "0%, 100%": {
            transform: "translateY(-15%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)"
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)"
          }
        }
      },
      animation: {
        "bounce-slow": "bounceSlow 1.5s infinite"
      }
    }
  },
  plugins: []
}
export default config
