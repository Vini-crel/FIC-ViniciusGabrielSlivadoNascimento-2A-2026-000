const notaInput = document.getElementById('nota');
const verificarBtn = document.getElementById('verificarBtn');
const resultadoDiv = document.getElementById('resultado');


function verificarSituacao() {

    let nota = parseFloat(notaInput.value);
    

    if (isNaN(nota)) {
        mostrarResultado('Por favor, digite um número válido.', 'erro');
        return;
    }
    
    if (nota < 0 || nota > 10) {
        mostrarResultado('A nota deve estar entre 0 e 10.', 'erro');
        return;
    }
    

    let situacao = '';
    let classe = '';
    
    if (nota >= 6) {
        situacao = `✅ Aprovado! (Nota: ${nota.toFixed(1)})`;
        classe = 'aprovado';
    } else if (nota >= 1) {
        situacao = `⚠️ Recuperação! (Nota: ${nota.toFixed(1)})`;
        classe = 'recuperacao';
    } else { 
        situacao = `❌ Reprovado! (Nota: ${nota.toFixed(1)})`;
        classe = 'reprovado';
    }
    
    mostrarResultado(situacao, classe);
}


function mostrarResultado(mensagem, tipo) {
    resultadoDiv.textContent = mensagem;

    resultadoDiv.className = 'resultado';

    resultadoDiv.classList.add(tipo);
}


verificarBtn.addEventListener('click', verificarSituacao);


notaInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        verificarSituacao();
    }
});