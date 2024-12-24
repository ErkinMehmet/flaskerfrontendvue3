/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',  // Add this if you have a single HTML file
    './src/**/*.{vue,js,ts,jsx,tsx}',  // Add this to cover all Vue components
  ],
  theme: {
    extend: {
      colors: {
        // Expanded Blue Shades
        'lightest-blue': '#cfe6fd',  // Very light blue
        'lighter-blue': '#a2c8f4',   // Light blue
        'blue': '#4f8bdf',            // Standard blue
        'royal-blue': '#4169e1',      // Royal blue
        'sky-blue': '#87ceeb',        // Sky blue
        'dark-blue': '#1c3f68',       // Dark blue
        'navy-blue': '#000080',       // Navy blue
        'midnight-blue': '#003366',   // Deep midnight blue

        // Expanded Green Shades
        'lightest-green': '#d4f7d1',  // Very light green
        'lighter-green': '#8fd9a8',   // Light green
        'green': '#48a14d',            // Standard green
        'lime-green': '#32cd32',       // Lime green
        'olive-green': '#808000',      // Olive green
        'dark-green': '#2a5a2d',       // Dark green
        'forest-green': '#228b22',     // Forest green
        'hunter-green': '#355e3b',     // Hunter green
      },
      fontFamily: {
        // Custom fonts
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        display: ['"Open Sans"', 'sans-serif'],
      },
      spacing: {
        // Add some custom spacing for margins/paddings
        '72': '18rem',  // For larger margins or paddings
        '84': '21rem',
      },
      boxShadow: {
        // Custom box shadows for depth
        'blue-glow': '0 4px 6px rgba(72, 161, 77, 0.3)',
        'green-glow': '0 4px 6px rgba(79, 139, 223, 0.3)',
      },
    },
  },
  plugins: [
    // Add any plugins if needed
  ],
}
