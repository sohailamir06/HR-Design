import forms from '@tailwindcss/forms';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F7ECFF',
          100: '#EED9FF',
          200: '#DDB8F9',
          500: '#B64DE0',
          600: '#9D32CD',
          700: '#7D21A8',
        },
        accent: {
          mint: '#0EA784',
          sky: '#1687B8',
          amber: '#B46A11',
          rose: '#D04473',
        },
        ink: '#1D1226',
        muted: '#786A86',
        line: '#E6D7F3',
        panel: '#FFFBFF',
        surface: '#F4E9FF',
      },
      fontFamily: {
        sans: ['Graphik', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        dashboard: '96rem',
      },
    },
  },
  plugins: [forms],
};
