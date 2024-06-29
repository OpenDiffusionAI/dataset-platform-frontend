import {nextui} from "@nextui-org/react"
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        mono: [ 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace' ]
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    addCommonColors: true,
  })],
};