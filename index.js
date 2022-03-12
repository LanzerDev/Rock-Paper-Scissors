const btnPiedra = document.querySelector('.piedra');
const btnPapel = document.querySelector('.papel');
const btnTijera = document.querySelector('.tijera');
const winMessage = document.querySelector('.win-message')
const userHand = document.querySelector('.user-img');
const pcHand = document.querySelector('.pc-img')
const wins = document.querySelector('.wins')
const loses = document.querySelector('.loses')

// shortcuts
const u = userHand.classList;
const p = pcHand.classList;

// Logica de botones
let userElection = '';
btnPiedra.onclick = () => {
    userElection = 'piedra'
    game()
    animation(userElection)
}
btnPapel.onclick = () => {
    userElection = 'papel'
    game()
    animation(userElection)
}
btnTijera.onclick = () => {
    userElection = 'tijera'
    game()
    animation(userElection)
}

// este codigo es para evitar que hagan muchas entradas xd

const disable = () => {
    btnPiedra.disabled = 'true'
    btnPapel.disabled = 'true'
    btnTijera.disabled = 'true'

    setTimeout(() => {
        btnPiedra.removeAttribute("disabled")
        btnPapel.removeAttribute("disabled")
        btnTijera.removeAttribute("disabled")
        u.contains('shakeU') ? u.remove('shakeU') : null
        p.contains('shakeP') ? p.remove('shakeP') : null
        wins.textContent = winCounter;
        loses.textContent = loseCounter;
    }, 4000);
}


// logica del juego 
let winCounter = 0;
let loseCounter = 0;
let pcElection;

const game = () => {

    
    winMessage.textContent = ''
    disable()


    let pc_election = Math.floor(Math.random() * 3);
    if (pc_election === 0) {
        if (userElection === 'piedra') {
            wait('TIED!') // pc: piedra / user: piedra
        } else if (userElection === 'papel') {
            winCounter++;
            wait('WIN!') // pc: piedra / user: papel
        } else {
            loseCounter++;
            wait('LOSE!') // pc: piedra / user: tijera
        }
    } else if (pc_election === 1) {
        if (userElection === 'piedra') {
            loseCounter++;
            wait('LOSE!') //pc: papel / user: piedra
        } else if (userElection === 'papel') {
            wait('TIED!') //pc: papel / user: papel
        } else {
            winCounter++;
            wait('WIN!') //pc: papel / user: tijera
        }
    } else if (pc_election === 2) {
        if (userElection === 'piedra') {
            winCounter++;
            wait('WIN!') //pc: tijera / user: piedra
        } else if (userElection === 'papel') {
            loseCounter++;
            wait('LOSE!') //pc: tijera / user: papel
        } else {
            wait('TIED!') //pc: tijera / user: tijera
        }
    }
    pcElection = pc_election;
}

// animacion y efectos

const animation = (userEl) => {

    userHand.src = './assets/rock.svg'
    pcHand.src = './assets/rock.svg'
    
    let i = 5;
    const hand = setInterval(() => {
        i--
        if (i == 0){
            userEl == 'papel' ? userHand.src = "./assets/paper.svg" : null
            userEl == 'tijera' ? userHand.src = "./assets/scissors.svg" : null
            clearInterval(hand)
        }
        u.contains('shakeU') ? u.remove('shakeU') : u.add('shakeU')
    }, 500);

    const handPC = setInterval(() => {
        if (i == 0){
            pcElection == 1 ? pcHand.src = "./assets/paper.svg" : null
            pcElection == 2 ? pcHand.src = "./assets/scissors.svg" : null
            clearInterval(handPC)
        }
        p.contains('shakeP') ? p.remove('shakeP') : p.add('shakeP')
    }, 500);
}

const wait = (message) => {
    const countDown = setTimeout(() => {
        winMessage.textContent = message;
        clearTimeout(countDown)
    }, 3000);
}


