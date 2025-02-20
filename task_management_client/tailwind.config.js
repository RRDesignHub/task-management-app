/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JSX and TSX files for Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        primary: "#16A34A", // Bright Green (Main button, highlights)
        primaryDark: "#15803D", // Dark Green (Hover states, headers)
        primaryLight: "#BBF7D0", // Light Green (Backgrounds, cards)
        secondary: "#065F46", // Deep Green (For contrast elements)
        background: "#f3fff999", // Light Greenish White (Main BG)
        card: "#D1FAE5", // Soft green for cards
        textDark: "#064E3B", // Dark text color
        textLight: "#10B981", // Light green text
      },
    },
  },
  plugins: [require("daisyui")], // Correct way to include plugins
};
