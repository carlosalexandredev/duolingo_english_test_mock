const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // Usando a versão 2.x do node-fetch

const app = express();
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta "docs"
app.use(express.static('docs'));

// Configurar a rota principal para servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/docs/index.html'); // O nome do seu arquivo HTML principal
});

const OPENAI_API_KEY = 'OPENAI_API_KEY'; // Substitua pela sua chave de API do ChatGPT

// Rota para enviar os dados do usuário para o ChatGPT
app.post('/chatgpt', async (req, res) => {
    const { text } = req.body;

    console.log('Recebido no servidor: ', { text }); // Log para depuração

    if (!text) {
        console.log('Erro: Texto não fornecido');
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        console.log('Enviando requisição para o ChatGPT...');

        // Fazer a requisição para a API do ChatGPT
        const chatgptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', // Alterado para gpt-3.5-turbo
                messages: [
                    { role: 'system', content: 'Escreva uma frase curta.' },
                    { role: 'user', content: text }
                ]
            })
        });

        const responseData = await chatgptResponse.json();
        console.log('Resposta da API do ChatGPT: ', responseData); // Log para depuração

        if (responseData.choices && responseData.choices.length > 0) {
            // Enviar a resposta do ChatGPT para o frontend
            res.json({ response: responseData.choices[0].message.content });
        } else {
            console.log('Nenhuma resposta válida da API do ChatGPT.');
            res.status(500).json({ error: 'No valid response from ChatGPT' });
        }
    } catch (error) {
        console.error('Erro ao se comunicar com o ChatGPT:', error);
        res.status(500).json({ error: 'An error occurred while communicating with ChatGPT' });
    }
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
