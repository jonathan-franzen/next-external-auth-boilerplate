import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    extend: {
      animation: {
        spinner:
          'rotation 0.7s linear infinite, change-color 1s ease-in-out infinite',
      },
      borderWidth: {
        3: '3px',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      keyframes: {
        'change-color': {
          '0%, 100%': {
            borderBottomColor: 'transparent',
            borderColor: colors.neutral['500'],
          },
          '50%': {
            borderBottomColor: 'transparent',
            borderColor: colors.neutral['300'],
          },
        },
        rotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      spacing: {
        10.5: '42px',
      },
    },
  },
} satisfies Config
