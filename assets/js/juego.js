const juego = (() => {
  "use strict";

  let deck = [];
  const types = ["C", "D", "H", "S"];
  const specials = ["A", "J", "Q", "K"];

  const buttonPedir = document.querySelector("#pedirCarta");
  const buttonNuevoJuego = document.querySelector("#nuevoJuego");
  const buttonPlantarse = document.querySelector("#plantarse");

  let puntosJugadores = [];

  const puntosHtml = document.querySelectorAll("small");
  const divCartasJugadores = document.querySelectorAll(".divCartas");

  const inicializarJuego = ( numJugadores = 2 ) => {
    deck = createDeck();
    puntosJugadores = new Array(numJugadores).fill(0);

    puntosHtml.forEach((elem) => (elem.innerText = 0));
    divCartasJugadores.forEach((elem) => (elem.innerHTML = ""));

    buttonPedir.disabled = false;
    buttonPlantarse.disabled = false;
  }

  const createDeck = () => {
    deck = [];

    for (let i = 2; i <= 10; i++) {
      for (let tipo of types) {
        deck.push(i + tipo);
      }
    }

    for (let tipo of types) {
      for (let esp of specials) {
        deck.push(esp + tipo);
      }
    }

    return  _.shuffle(deck);
  };

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }

    return deck.pop();
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    return !isNaN(valor)
      ? valor * 1
      : valor === "A"
          ? 11
          : 10;
  };

  buttonPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    let bandera = false;

    crearCarta(carta, 0);

    let puntosJugador = acumularPuntosJugador(carta, 0);

    if (puntosJugador > 21) {
      console.log("Perdiste");
      buttonPedir.disabled = true;
      buttonPlantarse.disabled = true;
      turnoComputadora(0);
    } else if (puntosJugador === 21) {
      console.log("Ganaste");
      buttonPedir.disabled = true;
      buttonPlantarse.disabled = true;
      turnoComputadora(puntosJugadores[0]);
    }
  });

  buttonNuevoJuego.addEventListener("click", () => {
    inicializarJuego();

    
  });

  buttonPlantarse.addEventListener("click", () => {
    turnoComputadora(puntosJugadores[0]);
    buttonPedir.disabled = true;
    buttonPlantarse.disabled = true;
  });

  const acumularPuntosJugador = ( carta, turnoJugador ) => {
    console.log(turnoJugador)
    puntosJugadores[turnoJugador] += valorCarta(carta);
    puntosHtml[turnoJugador].innerText = puntosJugadores[turnoJugador];

    return puntosJugadores[turnoJugador];
  }

  const crearCarta = (carta, turnoJugador) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugadores[turnoJugador].append(imgCarta);
  }

  const turnoComputadora = (puntosMinimos) => {
    while (
      puntosJugadores.at(-1) < puntosMinimos ||
      (puntosJugadores.at(-1) == 0 && puntosMinimos == 0)
    ) {
      const carta = pedirCarta();
      let puntosComputadora = acumularPuntosJugador(carta, puntosJugadores.length - 1);

      crearCarta(carta, puntosJugadores.length - 1);
    }

    setTimeout(() => {
      determinarGanador();
    }, 100);
  };
  
  const determinarGanador = () => {

    const [puntosJugador, puntosComputadora] = puntosJugadores;

    if (puntosComputadora > puntosJugador && puntosComputadora <= 21) {
      alert("Perdiste");
    } else if (puntosComputadora > 21) {
      confetti();
      alert("Ganaste");
    } else if (puntosComputadora === puntosJugador) {
      alert("Empate");
    } else if (puntosJugador === 21) {
      confetti();
      alert("Ganaste");
    } else if (puntosJugador > 21 && puntosComputadora < 21) {
      alert("Perdiste");
    }
  };

  return {
    inicializarJuego
  }
})();
