/** @type {import('tailwindcss').Config} */

const colors = {
  'dark-1': 'var(--wp--preset--color--dark-1)',
  'dark-2': 'var(--wp--preset--color--dark-2)',
  'dark-3': 'var(--wp--preset--color--dark-3)',
  'subtitle-1': 'var(--wp--preset--color--subtitle-1)',
  'light-1': 'var(--wp--preset--color--light-1)',
  'light-2': 'var(--wp--preset--color--light-2)',
  'red-1': 'var(--wp--preset--color--red-1)',
  'green-1': 'var(--wp--preset--color--green-1)',
  accent: 'var(--wp--preset--color--accent)',
}

const borderRadiusBase = 2

const subheading = (size) => ({
  '&.is-style-subheading': {
    fontSize: `${size}px`,
    fontWeight: 'normal',
  },
})

module.exports = {
  content: ['./src/**/*.{html,twig,php,js,tsx}'],
  darkMode: 'class',
  safelist: [
    /** required for the editor */
    '!m-auto',
    '!container',
    'dark',
    'dark:bg-dark-1',
    'dark:bg-dark-2',
    'dark:bg-dark-3',
    'bg-light-1',
  ],
  theme: {
    container: {
      screens: {
        sm: '600px',
        md: '728px',
        lg: '800px',
        xl: '1000px',
        '2xl': '1000px',
      },
    },
    extend: {
      maxWidth: {
        readable: '100%',
      },
      borderRadius: {
        sm: `${Math.ceil(borderRadiusBase * Math.pow(1.3, 0))}px`,
        md: `${Math.ceil(borderRadiusBase * Math.pow(1.3, 1))}px`,
        lg: `${Math.ceil(borderRadiusBase * Math.pow(1.3, 2))}px`,
      },
      colors,
      typography: () => ({
        DEFAULT: {
          css: {
            color: colors['dark-2'],
            maxWidth: '100%', // add required value here
            strong: { color: 'currentColor' },
            span: { color: 'currentColor' },
            div: { color: 'currentColor' },
            img: {
              marginTop: 0,
              marginBottom: 0,
            },
            h1: {
              color: 'currentColor',
              ...subheading(24),
            },
            h2: { color: 'currentColor', ...subheading(24) },
            h3: { color: 'currentColor', ...subheading(16) },
            h4: { color: 'currentColor', ...subheading(12) },
            h5: { color: 'currentColor' },
            h6: { color: 'currentColor' },
            a: {
              color: 'currentColor',
              cursor: 'pointer',
              textDecoration: 'none',
              '&:not(.wp-element-button):hover': {
                textDecoration: 'revert',
              },
            },
            p: { color: 'currentColor' },
            table: { color: 'currentColor' },
            th: { color: 'currentColor' },
            td: { color: 'currentColor' },
            input: {
              color: 'currentColor',
              '&::placeholder': {
                color: 'currentColor',
                opacity: 0.4,
                fontWeight: 400,
              },
            },
            textarea: {
              color: 'currentColor',
              '&::placeholder': {
                color: 'currentColor',
                opacity: 0.4,
                fontWeight: 400,
              },
            },
            blockquote: { color: 'currentColor' },
            pre: {
              backgroundColor: colors['dark-2'],
              color: colors['light-1'],
              // '.dark &': {
              //   backgroundColor: colors['light-1'],
              //   color: colors['dark-2'],
              // },
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
