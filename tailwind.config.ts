import scrollbar from 'tailwind-scrollbar';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    scrollbar, 
  ],
  variants: {
    scrollbar: ['rounded'], 
  },
  extend: {
    animation: {
      "spin-slow": "spin 8s linear infinite",
    },
  }
};
