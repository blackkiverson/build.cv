import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#111111', // Darkest elements
          800: '#1A1A1A', // Main background
          700: '#2B2B2B', // Button background, status section
          600: '#383838', // Hover states
          500: '#6B7280', // Secondary text, timestamps
          400: '#9CA3AF', // Muted text
          300: '#D1D5DB', // Primary text
          200: '#E5E7EB', // Headings
        },
      },
      spacing: {
        '16': '64px', // Sidebar width (4rem * 16)
        '24': '96px', // Left spacing for edit button (6rem * 16)
      },
      maxWidth: {
        '3xl': '768px', // Content width (48rem * 16)
      },
      borderRadius: {
        'lg': '8px',
        'full': '9999px',
      },
      fontSize: {
        'xs': ['12px', '16px'],     // Timestamps
        'sm': ['14px', '20px'],     // Secondary text
        'base': ['16px', '24px'],   // Body text
        'lg': ['18px', '28px'],     // Section headings
        'xl': ['20px', '28px'],     // Name
        '2xl': ['24px', '32px'],    // Large headings
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      letterSpacing: {
        tight: '-0.24px',
        normal: '0',
        wide: '0.24px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-in-out forwards',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '1040px', // 65ch equivalent
            color: '#D1D5DB', // text-gray-300
            h1: {
              color: '#E5E7EB', // text-gray-200
              fontWeight: '600',
            },
            h2: {
              color: '#E5E7EB', // text-gray-200
              fontWeight: '600',
            },
            strong: {
              color: '#E5E7EB', // text-gray-200
              fontWeight: '600',
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
}

export default config 