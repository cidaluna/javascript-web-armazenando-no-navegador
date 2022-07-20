const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
// verifica se ja existe itens no localStorage, se nao existir, criar um array vazio
// porem, para pegar os itens é preciso transformar de volta a string em objeto javascript por meio do JSON.parse
const itens = JSON.parse(localStorage.getItem("itens")) || []; 

// pagina é carregada buscando os elementos do localStorage e iterando e criando cada um dos elementos
itens.forEach((elemento) => {
    criaElemento(elemento);
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault(); // interromper o evento padrao
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    // verificar se o elemento ja existe, entao soma a quantidade apenas
    const existe = itens.find(elemento => elemento.nome === nome.value);

    // para salvar multiplos itens no localStorage
    // vamos enviar um Objeto (itemAtual), caso contrario, ele ira sobrescrever cada item enviado
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if(existe){
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        // itens[existe.id] = itemAtual;
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    }else{
        // cria o id com o valor do tamanho da lista itens
        //itemAtual.id = itens.length;
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        // chama funcao que cria o elemento enviando os valores por parametro
        criaElemento(itemAtual);

        // insere o item cadastrado no array
        itens.push(itemAtual); 

    }

    // transformar o objeto em uma string(pq só entende string) e passa o array itens por parametro
    localStorage.setItem("itens", JSON.stringify(itens));  

    // apos criar elemento limpar o campo do input
    nome.value = "";
    quantidade.value = "";

});

function criaElemento(item){

    // <li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");

    const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    novoItem.appendChild(numeroItem); // define a hierarquia que a tag strong estará dentro da tag <li>
    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeleta(item.id));
    lista.appendChild(novoItem);
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button");
    elementoBotao.innerHTML = "X";

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    })
    return elementoBotao;
}

function deletaElemento(tag, id) {
    tag.remove();
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
    localStorage.setItem("itens", JSON.stringify(itens));
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
