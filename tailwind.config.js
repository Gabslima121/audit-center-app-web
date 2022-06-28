module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#126ABB",
          200: "#1C5B95",
          300: "#3A81C3",
        },
        input: {
          100: '#B3B3B3'
        }
      },
      borderRadius: {
        fourty: '40px',
        half: '50px',
      },
      width: {
        'header': '1059px'
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}
