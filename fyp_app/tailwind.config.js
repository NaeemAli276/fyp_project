/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", // Key: ensure this path covers the files where you wrote the classes
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        regular: ['Poppins-Regular', 'sans-serif'],
        medium: ['Poppins-Medium', 'sans-serif'],
        semibold: ['Poppins-SemiBold', 'sans-serif'],
        bold: ['Poppins-Bold', 'sans-serif'],
        black: ['Poppins-Black', 'sans-serif'],
      },
      colors: {
        background: '#eff6ff',
        dark_accent: '#1f2937',
        dark_background: '#111827',
        dark_primary: '#5b98ff',
        primary: '#3b82f6',
        secondary: '#1e3a8a'
      }
    },
  },
  plugins: [],
};