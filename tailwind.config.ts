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
        // Add your custom colors here
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
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