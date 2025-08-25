import localFont from 'next/font/local'

// Define the Kamerik205 font with multiple weights and styles
export const kamerik205 = localFont({
  src: [
    {
      path: './Kamerik205-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './Kamerik205-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Kamerik205-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-kamerik205',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
})

// Alternative single weight configuration (if you only have one font file)
export const kamerik205Single = localFont({
  src: './Kamerik205-Regular.woff2',
  variable: '--font-kamerik205',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
})
