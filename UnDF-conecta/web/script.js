/*const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');

btn1.addEventListener('click', () => {
    alert("Botão 1 funcionando na WEB!");
});

btn2.addEventListener('click', () => {
    alert("Botão 2 funcionando na WEB!");
});

btn3.addEventListener('click', () => {
    alert("Botão 3 funcionando na WEB!");
});*/

// Aguarda o HTML carregar completamente antes de rodar o JS
document.addEventListener('DOMContentLoaded', () => {
    
    // Captura os elementos pelos IDs definidos no HTML
    const botao1 = document.getElementById('btn1');
    const botao2 = document.getElementById('btn2');
    const botao3 = document.getElementById('btn3');

    // Função de clique genérica para não repetir código
    const tratarClique = (nomeBotao) => {
        alert(`Você clicou no ${nomeBotao}!`);
    };

    // Adiciona o ouvinte de evento de clique para CADA botão
    
    // Verifica se o elemento foi encontrado antes de adicionar o evento (evita erros)
    if (botao1) {
        botao1.addEventListener('click', () => tratarClique('Botão 1 (Recursos)') );
    } else {
        console.error("Botão 1 não encontrado no HTML!");
    }

    if (botao2) {
        botao2.addEventListener('click', () => tratarClique('Botão 2 (Conexões)') );
    } else {
        console.error("Botão 2 não encontrado no HTML!");
    }

    if (botao3) {
        botao3.addEventListener('click', () => tratarClique('Botão 3 (Demandas)') );
    } else {
        console.error("Botão 3 não encontrado no HTML!");
    }
});