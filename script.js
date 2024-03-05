const html               = document.querySelector('html');
const focoBtn            = document.querySelector('.app__card-button--foco');
const curtoBtn           = document.querySelector('.app__card-button--curto');
const longoBtn           = document.querySelector('.app__card-button--longo');
const banner             = document.querySelector('.app__image');
const titulo             = document.querySelector('.app__title');
const botoes             = document.querySelectorAll(`.app__card-button`);
const startPauseBtn      = document.querySelector(`#start-pause`);
const musicaFocoInput    = document.querySelector('#alternar-musica');
const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const iniciarOuPausarImg = document.querySelector('#start-pause img');
const tempoNaTela        = document.querySelector('.app__card-timer');

//Música de Foco
const musica             = new Audio('./sons/luna-rise-part-one.mp3');
//Ativar loop
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener(`change`, function () {
    if(musica.paused){
        musica.play();
    }else if(musica.played){
        musica.pause();
    }
} );

function alterarContexto(contexto){
    botoes.forEach(function (contextoButton){
        contextoButton.classList.remove(`active`);
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    mostrarTempo();

    switch (contexto) {
        case 'foco':
            titulo.innerHTML =`                Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;    
            focoBtn.classList.add('active');
            break;
        case 'descanso-curto':
            titulo.innerHTML =`                Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            curtoBtn.classList.add('active');
            break;
        case 'descanso-longo':
            titulo.innerHTML =`                Hora de voltar à superficie.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            longoBtn.classList.add('active');
            break;
            
        default:
            break;
    }
}

focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos=1500;
    alterarContexto('foco');
});
curtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos=300;
    alterarContexto('descanso-curto');
});
longoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos=900;
    alterarContexto('descanso-longo');
});

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos<=0){
        executaSom('./sons/beep.mp3');
        zerar();
        return;
    }    
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
    console.log('Temporizador: ' + tempoDecorridoEmSegundos);
}

startPauseBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if (intervaloId) {
        executaSom('./sons/pause.mp3');
        zerar();
        return;
    }
    executaSom('./sons/play.wav');
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBtn.textContent = 'Pausar';
    iniciarOuPausarImg.setAttribute('src', `./imagens/pause.png`);
}

function zerar(){
    clearInterval(intervaloId);
    iniciarOuPausarBtn.textContent = 'Começar';
    iniciarOuPausarImg.setAttribute('src', `./imagens/play_arrow.png`);
    intervaloId = null;
}

function executaSom(caminho){
    let audio = new Audio(caminho);
    audio.currentTime = 0.0;
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    } 
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos*1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `<strong>${tempoFormatado}</strong>`;
}

mostrarTempo();