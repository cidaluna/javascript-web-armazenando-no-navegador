const form = document.getElementById('novoItem');

form.addEventListener('submit', (evento) => {
    evento.preventDefault(); // interromper o evento padrao
    // console.log("funcionou o clique do botao no formulario");
    // console.log(evento); // retorna o objeto inteiro, como tags, source, target e outras opções
    console.log(evento.target[0].value)
});
