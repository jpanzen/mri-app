import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray2: "var(--gray2)",
        gray10: "var(--gray10)",
        gray40: "var(--gray40)",
        greenButtons: "var(--green-buttons)",
        redButtons: "var(--red-buttons)",
      },
      backgroundImage: {
        'navbar': "url('/images/bg-light.png')"
      }
    },
  },
  plugins: [],
} satisfies Config;
