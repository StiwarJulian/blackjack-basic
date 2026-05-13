let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

const buttonPedir = document.querySelector('#pedirCarta')
const buttonNuevoJuego = document.querySelector('#nuevoJuego')
const buttonPlantarse = document.querySelector('#plantarse')

let puntosJugador = 0;
let puntosComputadora = 0;

const puntosHtml = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const createDeck = () => {
    for ( let i = 2; i <= 10; i++) {
        for ( let tipo of types) {
            deck.push(i + tipo);
        }
    }

    for ( let tipo of types) {
        for ( let esp of specials) {
            deck.push(esp + tipo);
        }   
    }

    deck = _.shuffle(deck);
    return deck;
}

createDeck();

const pedirCarta = () => {
    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    return carta;
}

const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1);

    return ( !isNaN(valor) ) 
            ? valor * 1 : (valor === 'A' && puntosJugador + 11 > 21)
            ? 1 : (valor === 'A') 
            ? 11 : 10;
}

buttonPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    let bandera = false;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);
    
    puntosJugador += valorCarta(carta);

    puntosHtml[0].innerText = puntosJugador;

    if (puntosJugador > 21) {
        console.log('Perdiste');
        buttonPedir.disabled = true;
        buttonPlantarse.disabled = true;
        turnoComputadora(0);
    } else if (puntosJugador === 21) {
        console.log('Ganaste');
        buttonPedir.disabled = true;
        buttonPlantarse.disabled = true;
        turnoComputadora(puntosJugador);
    }
})

buttonNuevoJuego.addEventListener('click', () => {
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHtml[0].innerText = puntosJugador;
    puntosHtml[1].innerText = puntosComputadora;

    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';

    buttonPedir.disabled = false;
    buttonPlantarse.disabled = false;
    deck = [];
    deck = createDeck();
})

buttonPlantarse.addEventListener('click', () => {   
    turnoComputadora(puntosJugador);
    buttonPedir.disabled = true;
    buttonPlantarse.disabled = true;
})

const turnoComputadora = ( puntosMinimos ) => {
    while ( (
            (puntosComputadora < puntosMinimos) || 
            (puntosComputadora == 0 && puntosMinimos == 0) 
        )) {
            
        const carta = pedirCarta();
        puntosComputadora += valorCarta(carta);

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        puntosHtml[1].innerText = puntosComputadora;
    } 

    setTimeout(() => {
        determinarGanador();
    }, 100);
}
    
const determinarGanador = () => {
    if (puntosComputadora > puntosJugador && puntosComputadora <= 21 ) {
        alert('Perdiste');
    } else if (puntosComputadora > 21) {
        confetti();
        alert('Ganaste');
    } else if (puntosComputadora === puntosJugador) {
        alert('Empate');
    } else if (puntosJugador === 21) {
        confetti();
        alert('Ganaste');
    } else if(puntosJugador > 21 && puntosComputadora < 21) {
        alert('Perdiste');
    }
}