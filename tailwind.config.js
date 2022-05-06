module.exports = {
   content: [
      "./index.html",
      "./src/**/*.tsx",
   ],
   theme: {
      extend: {
         keyframes: {
            scale: {
               "0%": { transform: "scale(1)" },
               "5%": { transform: "scale(1.2)" },
               "10%": { transform: "scale(1)" },
            }
         },
         animation: {
            scale: "scale 10s ease-in-out infinite"
         }
      },
   },
   plugins: [],
}