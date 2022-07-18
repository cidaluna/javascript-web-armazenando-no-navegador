const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
// verifica se ja existe itens no localStorage, se nao existir, criar um array vazio
// porem, para pegar os itens é preciso transformar de volta a string em objeto javascript por meio do JSON.parse
const itens = JSON.parse(localStorage.getItem('itens')) || []; 

// pagina é carregada buscando os elementos do localStorage e iterando e criando cada um dos elementos
itens.forEach((elemento) => {
    criaElemento(elemento);
});

form.addEventListener('submit', (evento) => {
    evento.preventDefault(); // interromper o evento padrao
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['coxinha'];

    // para salvar multiplos itens no localStorage
    // vamos enviar um Objeto (itemAtual), caso contrario, ele ira sobrescrever cada item enviado
    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    }

    // chama funcao que cria o elemento enviando os valores por parametro
    criaElemento(itemAtual);

    // insere o item cadastrado no array
    itens.push(itemAtual); 

    // transformar o objeto em uma string(pq só entende string) e passa o array itens por parametro
    localStorage.setItem('itens', JSON.stringify(itens));  

    // apos criar elemento limpar o campo do input
    nome.value = '';
    quantidade.value = '';

});

function criaElemento(item){

    // <li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;

    novoItem.appendChild(numeroItem); // define a hierarquia que a tag strong estará dentro da tag <li>
    novoItem.innerHTML += item.nome;

    lista.appendChild(novoItem);

}

/* Anotações

    Métodos próprios do localStorage para manipulação de dados:
    localStorage.clear(), localStorage.setItem(), localStorage.removeItem(), 
    localStorage.getItem(), localStorage.length(), localStorage.key().

    Os tipos de dados armazenados no localStorage não devem ser considerados sensíveis,
    de acordo com a LGPD (Lei Geral de Proteção de Dados). 
    Dados considerados sensíveis, devem ser armazenados em Cookies.

    LocalStorage armazena dados de forma persistente, apenas aqueles considerados não sensíveis. 
    Cookies possuem menor espaço de armazenamento 4KB, e salvam dados considerados sensíveis de forma persistente.
    Já SessionStorage não salva de forma persistente, armazenando dados apenas enquanto o site estiver aberto.
*/
