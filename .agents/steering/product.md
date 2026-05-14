# Product Overview

## Project Name
Blackjack Game

## Project Type
Web-based card game (Single Page Application)

## Core Functionality
A classic Blackjack card game where the player competes against the computer. The goal is to get closer to 21 points than the dealer without going over.

## Target Users
Casual gamers looking for a simple browser-based card game.

## Key Features
- Deck shuffling using underscore.js
- Player can request cards (Pedir Carta)
- Player can stand (Plantarse)
- New game initialization
- Score tracking for player and computer
- Win/lose/draw detection
- Confetti celebration on win
- Dynamic Ace handling (11 or 1 based on score)
- Custom modal for game results (vanilla JS)
- Classic casino visual design with elegant styling

## Game Rules Implemented
1. **Computer starts when player busts**: If player > 21, computer draws 1 card and wins automatically
2. **Computer plays to beat player**: Computer draws until it has more points than player (or busts)
3. **Risky behavior**: When player has < 15 points and there's a tie, computer risks extra cards to try to win
4. **Accepts tie**: When player has >= 15 points and there's a tie, computer accepts the tie
5. **Dynamic Ace**: Ace can be 1 or 11 dynamically based on total score

## User Flow
1. User clicks "Nuevo Juego" to start
2. Player requests cards to build hand
3. Player chooses to stand or busts (goes over 21)
4. Computer plays based on game rules
5. Winner is determined and displayed via custom modal

## Visual Design
- Classic casino theme with elegant styling
- Green gradient background with dark theme
- Gold accents (#d4af37) on title and buttons
- Elegant typography (Playfair Display for title, Lato for body)
- Animated card icons and floating effects
- Responsive design for mobile, tablet, and desktop