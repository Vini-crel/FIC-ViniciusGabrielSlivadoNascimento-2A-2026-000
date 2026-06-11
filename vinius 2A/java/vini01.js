const faixaIdadeSelect = document.getElementById('faixaIdade');
const statusIdadeDiv = document.getElementById('statusIdade');
const votacaoArea = document.getElementById('votacaoArea');
const btnIniciar = document.getElementById('btnIniciar');
const btnVotar = document.getElementById('btnVotar');
const numeroVotoInput = document.getElementById('numeroVoto');
const feedbackVotoDiv = document.getElementById('feedbackVoto');
const btnResetar = document.getElementById('btnResetar');


let votacaoAtiva = false;


function atualizarStatusIdade() {
    const opcao = faixaIdadeSelect.value;
    let mensagem = '';

   
    switch (opcao) {
        case 'menor':
            mensagem = '🚫 Você NÃO pode votar. Menor de 16 anos.';
            break;
        case '16-17':
            mensagem = '📢 Voto FACULTATIVO (16 a 17 anos). Você pode votar, mas não é obrigatório.';
            break;
        case '18-70':
            mensagem = '✅ Voto OBRIGATÓRIO (18 a 70 anos). Você deve votar!';
            break;
        case 'maior70':
            mensagem = '👴 Voto FACULTATIVO (acima de 70 anos). Você pode votar.';
            break;
        default:
            mensagem = 'Selecione uma faixa etária.';
    }
    statusIdadeDiv.textContent = mensagem;
}


function podeVotar() {
    const opcao = faixaIdadeSelect.value;
    return (opcao !== 'menor'); 
}


function iniciarVotacao() {
    if (!podeVotar()) {
        feedbackVotoDiv.className = 'feedback erro';
        feedbackVotoDiv.textContent = '❌ Você não tem permissão para votar. Selecione uma idade válida.';
        votacaoArea.style.display = 'none';
        return;
    }


    votacaoArea.style.display = 'block';
    feedbackVotoDiv.innerHTML = '';
    numeroVotoInput.value = '';
    votacaoAtiva = true; 


    faixaIdadeSelect.disabled = true;
    btnIniciar.disabled = true;
    
    
    feedbackVotoDiv.className = 'feedback info';
    feedbackVotoDiv.textContent = '🎯 Votação iniciada! Digite o número 80 e clique em "Confirmar Voto".';
    
    
    numeroVotoInput.focus();
}


function processarVoto() {
    if (!votacaoAtiva) {
        feedbackVotoDiv.className = 'feedback erro';
        feedbackVotoDiv.textContent = '⚠️ A votação não está ativa. Clique em "Iniciar Votação".';
        return;
    }

    const voto = parseInt(numeroVotoInput.value);
    
   
    if (voto === 80) {
        
        feedbackVotoDiv.className = 'feedback sucesso';
        feedbackVotoDiv.innerHTML = '✅ **VOTO COMPUTADO COM SUCESSO!**<br>Você votou no candidato 80. Obrigado pela participação.';
        
        votacaoAtiva = false;
        
        numeroVotoInput.disabled = true;
        btnVotar.disabled = true;

    } 
    else if (isNaN(voto)) {
        feedbackVotoDiv.className = 'feedback erro';
        feedbackVotoDiv.textContent = '❗ Número inválido. Digite o número 80 para confirmar seu voto.';

        numeroVotoInput.value = '';
        numeroVotoInput.focus();
    }
    else {

        feedbackVotoDiv.className = 'feedback erro';
        feedbackVotoDiv.textContent = `❌ Você digitou ${voto}. Para confirmar, é necessário digitar o número 80. Tente novamente.`;
        numeroVotoInput.value = '';
        numeroVotoInput.focus();
    }
}


function resetarVotacao() {

    faixaIdadeSelect.disabled = false;
    btnIniciar.disabled = false;

    votacaoArea.style.display = 'none';


    feedbackVotoDiv.className = '';
    feedbackVotoDiv.textContent = '';

    numeroVotoInput.disabled = false;
    btnVotar.disabled = false;
    numeroVotoInput.value = '';
    votacaoAtiva = false;

    atualizarStatusIdade();
}


faixaIdadeSelect.addEventListener('change', atualizarStatusIdade);
btnIniciar.addEventListener('click', iniciarVotacao);
btnVotar.addEventListener('click', processarVoto);
btnResetar.addEventListener('click', resetarVotacao);


atualizarStatusIdade();