let listaPessoas="Ana-15,João-28,Carlos-17,Maria-50";
let Pessoas=[];
let itens=listaPessoas.spilt(",")
for (let item of itens) {let [nome,idade]=item.split("-");
    Pessoas.push9({nome:nome,idade: Number(idade)});
}
console.log(Pessoas)
