import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a56db',      // насыщенный синий (доверие, профессионализм)
        'primary-light': '#3b82f6',
        'primary-dark': '#1e3a8a',
        secondary: '#0f172a',    // тёмно-синий для футера и акцентов
        accent: '#f59e0b',       // тёплый жёлтый для акцентов (кнопки, иконки)
        background: '#f8fafc',   // светлый серо-голубой
        foreground: '#0f172a',   // почти чёрный для текста
        muted: '#25282e',        // серый для второстепенного текста
        card: '#ffffff',
        border: '#e2e8f0',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};
export default config;