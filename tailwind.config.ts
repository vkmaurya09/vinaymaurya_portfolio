import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        code: "#FF7657", // Updated to retro orange
        "code-dark": "#E06A4E", // Darker retro orange
        highlight: "#FFD166",
        skillbar: {
          bg: "#1B1B22",
          go: "#FF7657", // Go - retro orange
          aws: "#FFC857", // AWS - retro yellow
          kafka: "#A55EA5", // Kafka - retro purple
          nodejs: "#3EB489", // Node.js - retro green
          typescript: "#5FA8D3", // TypeScript - retro blue
          redis: "#FF7657", // Redis - retro orange
          django: "#3EB489", // Django - retro green
        },
        retro: {
          orange: "#FF7657",
          yellow: "#FFC857",
          purple: "#A55EA5", 
          green: "#3EB489",
          blue: "#5FA8D3",
          bg: "#121217",
          card: "#1B1B22",
          text: "#F7F4F3",
          muted: "#8A8996",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
        display: ['VT323', 'monospace'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out": {
          "0%": {
            opacity: "1",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
        },
        "scale-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "pixel-in": {
          "0%": { 
            opacity: "0",
            filter: "blur(5px)",
          },
          "100%": { 
            opacity: "1",
            filter: "blur(0)",
          },
        },
        "scanline": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        "typing": {
          "from": { width: "0" },
          "to": { width: "100%" },
        },
        "horizontal-bounce": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(10px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(1440deg)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        blink: "blink 1s step-start infinite",
        "pixel-in": "pixel-in 0.4s ease-out forwards",
        "scanline": "scanline 8s linear infinite",
        "typing": "typing 3.5s steps(40, end)",
        "horizontal-bounce": "horizontal-bounce 1s infinite",
        "spin-slow": "spin-slow 3s cubic-bezier(0.4, 0.0, 0.2, 1) forwards",
      },
      backgroundImage: {
        'retro-grid': "linear-gradient(to right, #1B1B2277 1px, transparent 1px), linear-gradient(to bottom, #1B1B2277 1px, transparent 1px)",
        'noise': "url('/images/noise.png')",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
