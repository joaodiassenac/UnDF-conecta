document.addEventListener('DOMContentLoaded', () => {
    
    const botao1 = document.getElementById('btn1');
    const botao2 = document.getElementById('btn2');
    const botao3 = document.getElementById('btn3');

    
    const tratarClique = (nomeBotao) => {
        alert(`Você clicou no ${nomeBotao}!`);
    };
    
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