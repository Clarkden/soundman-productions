module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth:{
      "cards" : "176px",
      "dasbhoard-card" : "200px",
      "small-cards" : "134px"
    },
    maxWidth:{
      "cards" : "176px",
      "small-cards" : "134px"
    },
    width:{
      "small-cards" : "128px",
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