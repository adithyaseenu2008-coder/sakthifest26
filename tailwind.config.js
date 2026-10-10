/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          DEFAULT: '#B8DCCB',
          50: '#F4FAF7',
          100: '#E4F3EC',
          200: '#CBE7DA',
          300: '#B8DCCB',
          400: '#94C6AD',
          500: '#72B091',
        },
        forest: {
          DEFAULT: '#245747',
          50: '#EEFDF5',
          100: '#D7EEDE',
          200: '#B2DFC2',
          600: '#245747',
          700: '#1D4639',
          800: '#15342A',
          900: '#064031',
        },
        pink: {
          pastel: '#F2B7C6',
          50: '#FDF2F5',
          100: '#F9DEE5',
          200: '#F2B7C6',
          300: '#E68FA6',
        },
        cream: {
          DEFAULT: '#FFF8ED',
          50: '#FFFDF9',
          100: '#FFF8ED',
          200: '#FBF1DD',
          300: '#F3E4C3',
        },
        peach: {
          DEFAULT: '#F5B49D',
          50: '#FDF7F5',
          100: '#FBE8E1',
          200: '#F5B49D',
          300: '#EE8E6F',
        },
        charcoal: {
          DEFAULT: '#26332E',
          50: '#8E9995',
          100: '#67746F',
          400: '#404E48',
          700: '#2E3D37',
          800: '#26332E',
          900: '#19231F',
        },
        // Canonical brand color aliases
        'brand-mint': '#B8DCCB',
        'brand-forest': '#245747',
        'brand-pink': '#F2B7C6',
        'brand-cream': '#FFF8ED',
        'brand-peach': '#F5B49D',
        'brand-charcoal': '#26332E',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px -2px rgba(38, 51, 46, 0.05)',
        'lifted': '0 8px 24px -4px rgba(36, 87, 71, 0.08)',
        'elevated': '0 20px 40px -10px rgba(38, 51, 46, 0.14)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
