/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B4513',        // Saddle Brown - rustic Texas
        secondary: '#D2691E',      // Chocolate - warm leather tone
        accent: '#CD853F',         // Peru - dusty orange
        'rust': '#B7410E',         // Rust red
        'tan': '#D2B48C',          // Tan
        'cream': '#F5F5DC',        // Beige/cream
        'sage': '#9CAF88',         // Sage green
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'wood-texture': "url('/images/wood-texture.jpg')",
        'leather': "url('/images/leather-texture.jpg')",
      },
    },
  },
  plugins: [],
}
