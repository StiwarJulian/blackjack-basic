# Blackjack

Juego de Blackjack interactivo creado con HTML, CSS y JavaScript vanilla.

## Características

- Interfaz visual con cartas mostradas en pantalla
- Sistema de puntuación automático
- Los ases valen 11 o 1 según convenga al jugador
- La computadora juega automáticamente cuando el jugador se planta
- Efecto confeti al ganar
- Diseño estilo mesa de casino

## Cómo jugar

1. Abre `index.html` en tu navegador
2. Haz clic en **Nuevo Juego** para empezar
3. **Pedir Carta**: recibe una carta adicional
4. **Plantarse**: terminas tu turno y juega la computadora
5. Gana quien se acerque más a 21 sin pasarse

## Estructura del proyecto

```
blackjack/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── juego.js
    │   └── underscore-min.js
    └── cartas/
        └── (imágenes de cartas)
```

## Tecnologías

- HTML5
- Bootstrap 4
- JavaScript (vanilla)
- Underscore.js (para barajar)
- Canvas Confetti (efecto visual)