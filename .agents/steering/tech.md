# Technology Stack

## Frontend
- **HTML5** - Structure
- **CSS3** - Custom styling with classic casino theme
- **JavaScript (ES6+)** - Game logic (IIFE pattern with module pattern)

## External Dependencies
- Bootstrap 4.4.1 (CDN) - CSS only (no JS required)
- underscore.js (local) - Array shuffling
- confetti (CDN) - Win celebration effect

## Google Fonts
- **Playfair Display** - Elegant serif for title
- **Lato** - Clean sans-serif for body and buttons

## Development Tools
- No build process required
- Vanilla JavaScript (no framework, no jQuery)
- Single HTML file entry point

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive via custom CSS + Bootstrap grid

## Key Architecture Decisions
- Custom modal (vanilla JS) instead of Bootstrap JS modal
- IIFE pattern with centralized constants (MSGS, CONFIG)
- ES6+ features: const/let, arrow functions, template literals
- State management with separate arrays for scores and Aces
- No jQuery dependency - all interactions handled with vanilla JS
- CSS-only Bootstrap for layout (grid system)
- All visual styling done with custom CSS

## Visual Theme - Classic Casino
- Color palette: Deep greens (#1a3d2b, #0d2818), Gold accents (#d4af37)
- Background: Radial gradient from green to dark green
- Title: Playfair Display with gold subtitle, animated icon
- Buttons: Gradient backgrounds with gold borders and hover effects
- Responsive breakpoints: 768px (tablet), 1024px (desktop)