const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');

form.addEventListener('submit', (evento) => {
    evento.preventDefault(); // interromper o evento padrao
    // console.log("funcionou o clique do botao no formulario");
    // console.log(evento); // retorna o objeto inteiro, como tags, source, target, lista elementos e outras opções
    // console.log(evento.target[0].value); // retorna o valor do elemento no input nome
    // console.log(evento.target[1].value); // retorna o valor do elemento no input quantidade
    // console.log(evento.target.elements['nome'].value); // retorna o valor do elemento de acordo com o input name (nome)
    // console.log(evento.target.elements['coxinha'].value); // retorna o valor do elemento de acordo com o input name (quantidade)

    // chama funcao que cria o elemento enviando os valores por parametro
    criaElemento(evento.target.elements['nome'].value, evento.target.elements['coxinha'].value);
});

function criaElemento(nome, quantidade){
    // console.log(nome);
    // console.log(quantidade);

    // <li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');
    // console.log(novoItem);

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = quantidade;
    // console.log(numeroItem);

    novoItem.appendChild(numeroItem); // define a hierarquia que a tag strong estará dentro da tag <li>
    novoItem.innerHTML += nome;

    //console.log(novoItem);
    lista.appendChild(novoItem);

    console.log(novoItem);

}
