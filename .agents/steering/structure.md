# Project Structure

## File Organization
```
blackjack/
├── index.html              # Entry point with custom modal
├── assets/
│   ├── css/
│   │   └── style.css       # Custom casino styles + responsive
│   ├── js/
│   │   ├── juego.js        # Game logic (IIFE)
│   │   └── underscore-min.js
│   └── cartas/             # Card images (PNG)
└── .agents/
    └── steering/           # Kiro steering files
```

## Code Conventions

### JavaScript (juego.js)
- **Pattern**: IIFE with centralized constants
- **Constants**:
  - `MSGS` - All user-facing messages
  - `CONFIG` - Game configuration (MAX_PUNTOS: 21, PUNTOS_AS_*)
- **State Management**:
  - `puntosJugadores` - Array of scores [player, computer]
  - `AsesJugadores` - Track Aces per player (for dynamic 1/11)
- **Key Functions**:
  - `valorCarta()` - Returns card point value (A=11 initially)
  - `ajustarAs()` - Converts A from 11 to 1 when score > 21
  - `turnoComputadora()` - AI logic with risky behavior
  - `determinarGanador()` - Compares scores and shows result
  - `mostrarResultado()` - Uses custom modal (vanilla JS)

### Computer AI Logic (turnoComputadora)
1. **Player > 21**: Computer draws 1 card and wins automatically
2. **Phase 1**: Computer draws until reaching player score (or busts)
3. **Verification**: If computer > player and <= 21, continues to determineGanador
4. **Phase 2 (Risky)**: If player < 15 and tied, computer risks extra cards
   - While computer <= player and < 21: keep drawing
5. **Final**: determineGanador() decides the winner

### HTML (index.html)
- Semantic structure with Bootstrap grid
- Button IDs: `nuevoJuego`, `pedirCarta`, `plantarse`
- Score displays: `<small>` tags inside `<h2>`
- Custom modal: `.modal-overlay`, `.modal-dialog-custom`, etc.
- Header with icon 🎴 and subtitle
- Accessibility: `aria-label` attributes on buttons
- Scripts: `defer` attribute for non-blocking load

### CSS (style.css)
- **Theme**: Classic casino with green/gold palette
- **Import**: Google Fonts (Playfair Display, Lato)
- **Title**: Gradient background, gold border, animated icon, elegant typography
- **Buttons**: Gradient backgrounds, gold borders, hover effects, emoji icons
- **Cards**: Responsive sizing with hover effects
- **Modal**: Custom dark theme matching game aesthetic
- **Responsive**: Breakpoints at 768px and 1024px

## Architecture Notes
- Game logic encapsulated in IIFE to avoid global scope pollution
- Underscore.js used for deck shuffling (`_.shuffle()`)
- Dynamic Ace handling: starts as 11, converts to 1 if bust
- No jQuery or Bootstrap JS required
- Custom modal uses vanilla JS (style.display, classList, event listeners)
- Confetti only triggers on valid victory
- All visual styling done with custom CSS (no Bootstrap JS)