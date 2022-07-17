const form = document.getElementById('novoItem');

form.addEventListener('submit', (evento) => {
    evento.preventDefault(); // interromper o evento padrao
    //console.log("funcionou o clique do botao no formulario");
    console.log(evento); // retorna o objeto
})