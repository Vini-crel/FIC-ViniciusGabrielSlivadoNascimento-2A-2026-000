
const botao = document.getElementById("processarBtn");
const campo = document.getElementById("dados");
const divResultado = document.getElementById("resultado");


function processar(listaPessoas) {
    let pessoas = [];
    let itens = listaPessoas.split(",");

    for (let item of itens) {
        let [nome, idade] = item.split("-");
        pessoas.push({ nome: nome.trim(), idade: Number(idade) });
    }

    return pessoas;
}


function getSituacaoVoto(idade) {
    switch (true) {
        case idade < 16:
            return "Não vota";
        case idade >= 16 && idade <= 17:
            return "Voto facultativo";
        case idade >= 18 && idade <= 70:
            return "Voto obrigatório";
        case idade > 70:
            return "Voto facultativo";
        default:
            return "Idade inválida";
    }
}

function exibir(pessoas) {
    divResultado.innerHTML = ""; 
    for (let p of pessoas) {
        let situacao = getSituacaoVoto(p.idade);
        divResultado.innerHTML += `<p>${p.nome} - ${p.idade} anos - <strong>${situacao}</strong></p>`;
    }
}


function iniciarVotacao(pessoas) {

    const aptos = pessoas.filter(p => getSituacaoVoto(p.idade) !== "Não vota");

    if (aptos.length === 0) {
        divResultado.innerHTML += "<p><em>Nenhum eleitor apto para votar.</em></p>";
        return;
    }

    divResultado.innerHTML += "<hr><h3>Votação</h3>";

    for (let eleitor of aptos) {
        let voto;

        do {
            voto = prompt(`${eleitor.nome}, digite o número do seu candidato:`);
            if (voto === null) {
                alert("Você cancelou a votação. O programa será encerrado.");
                return; 
            }
            if (voto.trim() !== "80") {
                alert("Número errado! Vote novamente.");
            }
        } while (voto.trim() !== "80");

        alert(`Voto confirmado para o candidato 80!`);
        eleitor.voto = 80;
    }

    exibirResultadoVotacao(aptos);
}


function exibirResultadoVotacao(aptos) {
    let html = "<h3>Resultado da Votação</h3><ul>";
    for (let p of aptos) {
        html += `<li>${p.nome} votou no candidato ${p.voto}</li>`;
    }
    html += "</ul><p><strong>Todos os eleitores aptos votaram no candidato 80.</strong></p>";
    divResultado.innerHTML += html;
}


botao.addEventListener("click", function () {
    const dados = campo.value.trim();

    if (!dados) {
        alert("Por favor, insira os dados no formato correto.");
        return;
    }

    const pessoas = processar(dados);
    exibir(pessoas);
    iniciarVotacao(pessoas);
});