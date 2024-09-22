let timerElement = document.getElementById('timer');
let checkButton = document.getElementById('checkButton');
let timeLeft = 60; // tempo em segundos
let modal = document.getElementById('modal');
let nextButton = document.getElementById('nextButton');
let responseText = document.getElementById('responseText');
let chatgptResponseElement = document.getElementById('chatgptResponse');
let textArea = document.getElementById('userText');
//let imageElement = document.getElementById('imageSource');

// Temporizador
function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    if (seconds < 10) seconds = '0' + seconds;
    timerElement.textContent = `${minutes}:${seconds}`;
    timeLeft--;

    if (timeLeft >= 0) {
        setTimeout(updateTimer, 1000);
    } else {
        checkButton.disabled = true; // Desabilita o botão quando o tempo acaba
        textArea.disabled = true; // Desabilita o campo de texto quando o tempo acabar
        handleSubmit(); // Chama o envio para o ChatGPT quando o tempo acaba
    }
}

// Função chamada quando o tempo acaba ou o botão CHECK é clicado
function handleSubmit() {
    let userText = textArea.value;
    responseText.textContent = userText || 'No response provided.'; // Exibir o texto do usuário
    modal.style.display = 'block'; // Mostrar modal
    textArea.disabled = true; // Desabilita o campo de texto após o check
    sendToAPI(userText); // Chama a API do ChatGPT
}

// Mostra o modal quando o botão "CHECK" for clicado
checkButton.onclick = function () {
    if (!checkButton.disabled) {
        handleSubmit(); // Chama a função de envio
    }
}

// Botão NEXT fecha a modal
nextButton.onclick = function () {
    modal.style.display = 'none';
}

// Função para enviar os dados para a API do ChatGPT
/**
function sendToAPI(userText) {
    console.log('Enviando dados para o servidor...');

    fetch('/chatgpt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: userText // Enviar o texto inserido pelo usuário
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta do ChatGPT recebida:', data);
        // Exibir a resposta do ChatGPT no modal
        chatgptResponseElement.textContent = data.response || 'Nenhuma resposta do ChatGPT.';
    })
    .catch(error => {
        console.error('Erro ao enviar os dados:', error);
        chatgptResponseElement.textContent = 'Ocorreu um erro ao obter a resposta.';
    });
}
*/

// Inicia o temporizador
updateTimer();
