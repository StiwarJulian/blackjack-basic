# Blackjack

Juego de Blackjack interactivo creado con HTML, CSS y JavaScript vanilla.

## Características

- Interfaz visual con cartas mostradas en pantalla
- Sistema de puntuación automático
- Los ases valen 11 o 1 según convenga al jugador (dinámico)
- La computadora juega automáticamente cuando el jugador se planta
- **Lógica inteligente de la computadora**:
  - Si el jugador se pasa de 21, la computadora solo necesita 1 carta para ganar
  - Si el jugador tiene menos de 15 puntos y hay empate, la computadora arriesga para intentar ganar
  - Si el jugador tiene 15+ puntos y hay empate, acepta el empate
- Efecto confeti al ganar
- Diseño estilo casino clásico con elegantes acentos dorados
- Modal personalizado para mostrar resultados (sin jQuery)
- Totalmente responsive para móvil, tablet y escritorio

## Cómo jugar

1. Abre `index.html` en tu navegador
2. Haz clic en **Nuevo Juego** para empezar
3. **Pedir Carta** 🃏: recibe una carta adicional
4. **Plantarse** ✋: terminas tu turno y juega la computadora
5. Gana quien se acerque más a 21 sin pasarse

## Reglas del juego

- El jugador compite contra la computadora
- Las cartas numéricas valen su número (2-10)
- Las figuras (J, Q, K) valen 10 puntos
- Los Ases pueden valer 1 u 11 dinámicamente
- Si te pasas de 21 pierdes automáticamente
- La computadora tiene lógica inteligente para arriesgar en ciertas situaciones

## Estructura del proyecto

```
blackjack/
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── juego.js
│   │   └── underscore-min.js
│   └── cartas/
│       └── (imágenes de cartas)
└── .agents/
    └── steering/
        └── (documentación de Kiro)
```

## Tecnologías

- HTML5
- Bootstrap 4 (CSS only)
- JavaScript ES6+ (vanilla, sin jQuery)
- Underscore.js (para barajar)
- Canvas Confetti (efecto visual)
- Google Fonts (Playfair Display, Lato)

## Diseño Visual

- Tema clásico de casino con tonos verdes oscuros y acentos dorados
- Tipografía elegante para el título
- Botones con gradientes y efectos hover
- Fondo con gradiente radial
- Responsive design para todos los dispositivos