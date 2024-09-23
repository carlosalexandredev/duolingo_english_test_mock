let timerElement = document.getElementById('timer');
let checkButton = document.getElementById('checkButton');
let timeLeft = 90; // tempo em segundos
let modal = document.getElementById('modal');
let nextButton = document.getElementById('nextButton');
let responseText = document.getElementById('responseText');
let textArea = document.getElementById('userText');

// Função para atualizar o temporizador
function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    if (seconds < 10) seconds = '0' + seconds;
    timerElement.textContent = `${minutes}:${seconds}`;
    timeLeft--;

    if (timeLeft >= 0) {
        setTimeout(updateTimer, 1000);
    } else {
        textArea.disabled = true; // Desabilita o campo de texto quando o tempo acabar
        handleSubmit(); // Chama o envio quando o tempo acaba
    }
}

// Exibe o textarea e o botão "CHECK" após 30 segundos
setTimeout(function() {
    document.getElementById('userText').style.display = 'block';
    document.getElementById('checkButton').style.display = 'block';
    document.getElementById('description1-container').style.display = 'none';
    document.getElementById('description2-container').style.display = 'block';
}, 30000);

// Função chamada quando o tempo acaba ou o botão CHECK é clicado
function handleSubmit() {
    let userText = textArea.value;
    responseText.textContent = userText || 'No response provided.'; // Exibir o texto do usuário
    modal.style.display = 'block'; // Mostrar modal
    textArea.disabled = true; // Desabilita o campo de texto após o check
}

// Mostra o modal quando o botão "CHECK" for clicado
checkButton.onclick = function () {
    handleSubmit();
}

// Botão NEXT fecha a modal
nextButton.onclick = function () {
    modal.style.display = 'none';
}

// Inicia o temporizador
updateTimer();
