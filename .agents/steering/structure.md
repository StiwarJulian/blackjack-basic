# Project Structure

## File Organization
```
blackjack/
├── index.html              # Entry point
├── assets/
│   ├── css/
│   │   └── style.css       # Custom styles
│   ├── js/
│   │   ├── juego.js        # Game logic (IIFE)
│   │   └── underscore-min.js
│   └── cartas/             # Card images (PNG)
└── .agents/
    └── steering/           # Kiro steering files
```

## Code Conventions

### JavaScript (juego.js)
- **Pattern**: IIFE (Immediately Invoked Function Expression) with `"use strict"`
- **Naming**: camelCase for variables and functions
- **DOM Selection**: `document.querySelector` and `querySelectorAll`
- **Event Handling**: `addEventListener` for button interactions
- **State Management**: Array-based player scores (`puntosJugadores`)
- **Card Logic**: String-based card identification (e.g., "10H" = 10 of Hearts)

### HTML
- Semantic structure with Bootstrap grid
- Button IDs: `nuevoJuego`, `pedirCarta`, `plantarse`
- Score displays: `<small>` tags inside `<h2>`

### CSS
- Custom styles in `style.css`
- Card styling: `.carta` class for card images
- Bootstrap overrides as needed

## Architecture Notes
- Game logic encapsulated in IIFE to avoid global scope pollution
- Underscore.js used for deck shuffling (`_.shuffle()`)
- Computer plays automatically after player stands
- Winner determined by comparing scores (player vs computer)