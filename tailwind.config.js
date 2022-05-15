module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth:{
      "cards" : "176px",
      "dasbhoard-card" : "200px"
    },
    maxWidth:{
      "cards" : "176px"
    },
    width:{
      "dasbhoard-card" : "200px"
    },
    height:{
      "dasbhoard-card" : "200px"
    },
    minHeight:{
      "dasbhoard-card" : "200px"
    }

    },
  },
  plugins: [],
}