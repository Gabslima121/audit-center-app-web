module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        brand: {
          90: "#6bafed",
          100: "#126ABB",
          200: "#1C5B95",
          300: "#3A81C3",
          400: "#2885CC",
        },
        input: {
          100: '#B3B3B3'
        },
        button_exclude: {
          100: '#FBAEAE',
          200: "#C33A3A"
        },
        table_background: {
          100: "#DCDCDC"
        }
      },
      borderRadius: {
        fourty: '40px',
        half: '50px',
      },
      width: {
        'header': '1059px'
      },
      height: {
        'custom': '600px'
      },
      margin: {
        'modal-trash': '165px',
        'save-user-info': '630px',
      },
      boxShadow: {
        '3xl': '10px 10px 10px rgba(243, 244, 246, 0.3)',
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}
