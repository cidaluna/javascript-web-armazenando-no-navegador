const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
// verifica se ja existe itens no localStorage, se nao existir, criar um array vazio
// porem, para pegar os itens é preciso transformar de volta a string em objeto javascript por meio do JSON.parse
const itens = JSON.parse(localStorage.getItem('itens')) || []; 

console.log(itens);

form.addEventListener('submit', (evento) => {
    evento.preventDefault(); // interromper o evento padrao

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['coxinha'];

    // console.log("funcionou o clique do botao no formulario");
    // console.log(evento); // retorna o objeto inteiro, como tags, source, target, lista elementos e outras opções
    // console.log(evento.target[0].value); // retorna o valor do elemento no input nome
    // console.log(evento.target[1].value); // retorna o valor do elemento no input quantidade
    // console.log(evento.target.elements['nome'].value); // retorna o valor do elemento de acordo com o input name (nome)
    // console.log(evento.target.elements['coxinha'].value); // retorna o valor do elemento de acordo com o input name (quantidade)

    // chama funcao que cria o elemento enviando os valores por parametro
    criaElemento(nome.value, quantidade.value);

    // apos criar elemento limpar o campo do input
    nome.value = '';
    quantidade.value = '';

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

    // para salvar multiplos itens no localStorage
    // vamos enviar um Objeto (itemAtual), caso contrario, ele ira sobrescrever cada item enviado
    const itemAtual = {
        'nome': nome,
        'quantidade': quantidade
    }

    // insere o item cadastrado no array
    itens.push(itemAtual); 

    // transformar o objeto em uma string(pq só entende string) e passa o array itens por parametro
    localStorage.setItem('itens', JSON.stringify(itens)); 
   
    // métodos próprios do localStorage para manipulação de dados:
    // localStorage.clear(), localStorage.setItem(), localStorage.removeItem(), 
    // localStorage.getItem(), localStorage.length(), localStorage.key().

    // Os tipos de dados armazenados no localStorage não devem ser considerados sensíveis,
    // de acordo com a LGPD (Lei Geral de Proteção de Dados). 
    // Dados considerados sensíveis, devem ser armazenados em Cookies.

}
