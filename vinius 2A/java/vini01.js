const valoresTextarea = document.getElementById('valores');
const btnCrescente = document.getElementById('btnCrescente');
const btnDecrescente = document.getElementById('btnDecrescente');
const btnLimpar = document.getElementById('btnLimpar');
const resultadoDiv = document.getElementById('resultado');
const erroDiv = document.getElementById('erro');


function limparErro() {
    erroDiv.textContent = '';
}


function exibirErro(mensagem) {
    erroDiv.textContent = mensagem;
    resultadoDiv.textContent = '---';
}


function extrairNumeros() {
    const texto = valoresTextarea.value.trim();
    if (texto === '') {
        exibirErro('❌ Nenhum número digitado. Insira valores separados por vírgula.');
        return null;
    }
    

    const partes = texto.split(',').map(part => part.trim());
    const numeros = [];
    
    for (let i = 0; i < partes.length; i++) {
        const valor = parseFloat(partes[i]);
        if (isNaN(valor)) {
            exibirErro(`❌ Valor inválido: "${partes[i]}". Use apenas números e vírgulas.`);
            return null;
        }
        numeros.push(valor);
    }
    
    if (numeros.length === 0) {
        exibirErro('❌ Nenhum número válido encontrado.');
        return null;
    }
    
    limparErro();
    return numeros;
}


function ordenar(decrescente = false) {
    const numeros = extrairNumeros();
    if (!numeros) return;
    
    const ordenados = [...numeros];
    
    if (decrescente) {
        ordenados.sort((a, b) => b - a);
    } else {
        ordenados.sort((a, b) => a - b);
    }
    

    const resultadoTexto = ordenados.join(' → ');
    resultadoDiv.textContent = resultadoTexto;
    

    if (decrescente) {
        resultadoDiv.style.borderLeft = '5px solid #e67e22';
    } else {
        resultadoDiv.style.borderLeft = '5px solid #2ecc71';
    }
}


btnCrescente.addEventListener('click', () => ordenar(false));
btnDecrescente.addEventListener('click', () => ordenar(true));
btnLimpar.addEventListener('click', () => {
    valoresTextarea.value = '';
    resultadoDiv.textContent = '---';
    limparErro();
    resultadoDiv.style.borderLeft = '1px solid #ddd';
});


window.addEventListener('load', () => {
    valoresTextarea.value = '5, 2, 9, 1, 7, 3';
    ordenar(false);
});