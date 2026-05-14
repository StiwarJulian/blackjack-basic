const juego = (() => {
  "use strict";

  const MSGS = {
    NO_CARTAS: "No hay cartas en el deck",
    PERDISTE: "Perdiste",
    GANASTE: "Ganaste",
    EMPATE: "Empate",
    JUGADOR: "Jugador",
    COMPUTADORA: "Computadora"
  };

  const CONFIG = {
    MAX_PUNTOS: 21,
    PUNTOS_AS_BAJO: 1,
    PUNTOS_AS_ALTO: 11
  };

  let deck = [];
  const types = ["C", "D", "H", "S"];
  const specials = ["A", "J", "Q", "K"];

  const buttonPedir = document.querySelector("#pedirCarta");
  const buttonNuevoJuego = document.querySelector("#nuevoJuego");
  const buttonPlantarse = document.querySelector("#plantarse");

  let puntosJugadores = [];
  let AsesJugadores = [];

  const puntosHtml = document.querySelectorAll("small");
  const divCartasJugadores = document.querySelectorAll(".divCartas");

  const inicializarJuego = (numJugadores = 2) => {
    deck = createDeck();
    puntosJugadores = new Array(numJugadores).fill(0);
    AsesJugadores = new Array(numJugadores).fill(0);

    puntosHtml.forEach((elem) => (elem.innerText = 0));
    divCartasJugadores.forEach((elem) => (elem.innerHTML = ""));

    buttonPedir.disabled = false;
    buttonPlantarse.disabled = false;
  };

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

    return _.shuffle(deck);
  };

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw MSGS.NO_CARTAS;
    }
    return deck.pop();
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    if (!isNaN(valor)) {
      return parseInt(valor, 10);
    }

    if (valor === "A") {
      return CONFIG.PUNTOS_AS_ALTO;
    }

    return 10;
  };

  const ajustarAs = (turnoJugador) => {
    while (puntosJugadores[turnoJugador] > CONFIG.MAX_PUNTOS && AsesJugadores[turnoJugador] > 0) {
      puntosJugadores[turnoJugador] -= 10;
      AsesJugadores[turnoJugador] -= 1;
    }
  };

  buttonPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const turno = 0;

    if (carta.startsWith("A")) {
      AsesJugadores[turno] += 1;
    }

    crearCarta(carta, turno);
    let puntosJugador = acumularPuntosJugador(carta, turno);

if (puntosJugador > CONFIG.MAX_PUNTOS) {
        ajustarAs(turno);
        puntosJugador = puntosJugadores[turno];

        if (puntosJugador > CONFIG.MAX_PUNTOS) {
          buttonPedir.disabled = true;
          buttonPlantarse.disabled = true;
          turnoComputadora();
          return;
        }
      }

    if (puntosJugador === CONFIG.MAX_PUNTOS) {
      buttonPedir.disabled = true;
      buttonPlantarse.disabled = true;
      mostrarResultado(MSGS.GANASTE, true);
    }
  });

  buttonNuevoJuego.addEventListener("click", () => {
    inicializarJuego();
  });

  buttonPlantarse.addEventListener("click", () => {
    buttonPedir.disabled = true;
    buttonPlantarse.disabled = true;
    turnoComputadora();
  });

  const acumularPuntosJugador = (carta, turnoJugador) => {
    puntosJugadores[turnoJugador] += valorCarta(carta);
    puntosHtml[turnoJugador].innerText = puntosJugadores[turnoJugador];
    return puntosJugadores[turnoJugador];
  };

  const crearCarta = (carta, turnoJugador) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    imgCarta.alt = `Carta ${carta}`;
    divCartasJugadores[turnoJugador].append(imgCarta);
  };

  const turnoComputadora = () => {
    const puntosPlayer = puntosJugadores[0];
    const turnoPC = puntosJugadores.length - 1;

    if (puntosPlayer > CONFIG.MAX_PUNTOS) {
      const carta = pedirCarta();
      if (carta.startsWith("A")) {
        AsesJugadores[turnoPC] += 1;
      }
      acumularPuntosJugador(carta, turnoPC);
      ajustarAs(turnoPC);
      crearCarta(carta, turnoPC);
      setTimeout(() => mostrarResultado(MSGS.PERDISTE, false), 100);
      return;
    }

    while (puntosJugadores[turnoPC] < puntosPlayer && puntosJugadores[turnoPC] < CONFIG.MAX_PUNTOS) {
      const carta = pedirCarta();
      if (carta.startsWith("A")) {
        AsesJugadores[turnoPC] += 1;
      }
      acumularPuntosJugador(carta, turnoPC);
      ajustarAs(turnoPC);
      crearCarta(carta, turnoPC);
    }

    if (puntosPlayer < 15 && puntosJugadores[turnoPC] === puntosPlayer) {
      while (puntosJugadores[turnoPC] <= puntosPlayer && puntosJugadores[turnoPC] < CONFIG.MAX_PUNTOS) {
        const carta = pedirCarta();
        if (carta.startsWith("A")) {
          AsesJugadores[turnoPC] += 1;
        }
        acumularPuntosJugador(carta, turnoPC);
        ajustarAs(turnoPC);
        crearCarta(carta, turnoPC);
      }
    }

    setTimeout(() => {
      determinarGanador();
    }, 100);
  };

  const determinarGanador = () => {
    const [puntosJugador, puntosComputadora] = puntosJugadores;

    if (puntosComputadora > CONFIG.MAX_PUNTOS) {
      if (puntosJugador <= CONFIG.MAX_PUNTOS) {
        mostrarResultado(MSGS.GANASTE, true);
      } else {
        mostrarResultado(MSGS.EMPATE, false);
      }
      return;
    }

    if (puntosComputadora > puntosJugador) {
      mostrarResultado(MSGS.PERDISTE, false);
      return;
    }

    if (puntosComputadora === puntosJugador) {
      mostrarResultado(MSGS.EMPATE, false);
      return;
    }

    if (puntosJugador <= CONFIG.MAX_PUNTOS) {
      mostrarResultado(MSGS.GANASTE, true);
      return;
    }

    mostrarResultado(MSGS.PERDISTE, false);
  };

  const mostrarResultado = (mensaje, esVictoria) => {
    const resultModal = document.getElementById("resultModal");
    const resultMessage = document.getElementById("resultMessage");
    const closeBtn = resultModal.querySelector(".close-btn");
    const acceptBtn = resultModal.querySelector(".modal-footer-custom .btn-primary");

    const cerrarModal = () => {
      resultModal.style.display = "none";
    };

    closeBtn.onclick = cerrarModal;
    acceptBtn.onclick = cerrarModal;
    resultModal.onclick = (e) => {
      if (e.target === resultModal) cerrarModal();
    };

    if (resultModal && resultMessage) {
      resultMessage.textContent = mensaje;
      resultModal.style.display = "flex";

      if (esVictoria) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      }
    } else {
      if (esVictoria) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      }
      setTimeout(() => alert(mensaje), 300);
    }
  };

  return {
    inicializarJuego
  };
})();