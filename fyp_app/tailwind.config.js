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
        "poppins-light": ['Poppins-Light'],
        "poppins-regular": ['Poppins-Regular'],
        "poppins-medium": ['Poppins-Medium'],
        "poppins-semibold": ['Poppins-SemiBold'],
        "poppins-bold": ['Poppins-Bold'],
        "poppins-black": ['Poppins-Black'],
      },
      colors: {
        background: '#eff6ff',
        dark_accent: '#1f2937',
        dark_background: '#111827',
        dark_primary: '#5b98ff',
        primary: '#3b82f6',
        secondary: '#1e3a8a',
        text: '#1e3a8a'
      }
    },
  },
  plugins: [],
};