
document.addEventListener("DOMContentLoaded", function() {

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
        if (idade < 16) return "Não vota";
        if (idade >= 16 && idade <= 17) return "Voto facultativo";
        if (idade >= 18 && idade <= 70) return "Voto obrigatório";
        return "Voto facultativo";
    }


    function confirmarVoto(nome, inputElement, mensagemElement) {
        const numero = inputElement.value.trim();
        if (numero === "80") {
            mensagemElement.textContent = `${nome}, voto confirmado no candidato 80!`;
            mensagemElement.style.color = "green";
        } else {
            mensagemElement.textContent = `Vote no candidato 80! Número inválido.`;
            mensagemElement.style.color = "red";
        }
    }


    function exibir(pessoas) {
        divResultado.innerHTML = "";

        for (let p of pessoas) {
            let situacao = getSituacaoVoto(p.idade);
            

            const container = document.createElement("div");
            container.style.marginBottom = "10px";
            container.style.borderBottom = "1px solid #ccc";
            container.style.padding = "5px";
            

            const info = document.createElement("p");
            info.innerHTML = `${p.nome} - ${p.idade} anos - <strong>${situacao}</strong>`;
            container.appendChild(info);


            if (p.idade >= 16) {
                const label = document.createElement("label");
                label.textContent = "Nº do candidato: ";
                
                const inputCandidato = document.createElement("input");
                inputCandidato.type = "number";
                inputCandidato.placeholder = "80";
                inputCandidato.style.width = "60px";
                
                const btnVotar = document.createElement("button");
                btnVotar.textContent = "Votar";
                
                const mensagem = document.createElement("span");
                mensagem.style.marginLeft = "10px";
                

                btnVotar.addEventListener("click", function() {
                    confirmarVoto(p.nome, inputCandidato, mensagem);
                });
                
                container.appendChild(label);
                container.appendChild(inputCandidato);
                container.appendChild(btnVotar);
                container.appendChild(mensagem);
            }
            
            divResultado.appendChild(container);
        }
    }

    // Evento do botão Processar
    botao.addEventListener("click", function() {
        let texto = campo.value;
        let lista = processar(texto);
        exibir(lista);
    });
});