module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#e10600',
        f1: {
          dark: '#15151e',
          card: '#1e1e2e',
          border: '#2a2a3a',
        }
      }
    }
  },
  plugins: []
};
