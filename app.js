let listaDeNumerosSorteados = [];
let numeroMaximo = 100;
// let title = document.querySelector('h1')

// title.innerHTML = 'Jogo do Número Secreto'
let numeroSecreto = gerarNumeroAleatorio();
tentativas = 1;
exibirMensagemInicial();

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'en'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Game of Secret Number');
    exibirTextoNaTela('p', `Choose a number between 1 and ${numeroMaximo}`);
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', `Congratulations! ${numeroSecreto}`);
        exibirTextoNaTela('p', 'You discovered the secret number!');
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else { if (chute > numeroSecreto) {
        exibirTextoNaTela('p', `Wrong!! try again other smaller number, attempt: ${tentativas}`);
        } else { if (chute < numeroSecreto) {
            exibirTextoNaTela('p', `Wrong!! Try again other higher number, attempt: ${tentativas}`);
            } else {
                exibirTextoNaTela('p', 'Your number is zero');
            }
        }
    }
    tentativas += 1;
    limparCampo();
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let listaDeNumeros = listaDeNumerosSorteados;
    
    if (listaDeNumeros == numeroMaximo) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}