function handleCreateItem(event) {
    event.preventDefault()
    const nome = document.getElementById('nome').value;
    const quantidade = document.getElementById('quantidade').value;
    if(!nome) {
        alert('digite um nome para o item')
        return
    }

    if(!quantidade) {
        alert('digite uma quantidade')
        return
    }
    let lista = localStorage.getItem('lista');
    const idItem = new Date().getTime()
    if(lista) {
        lista = JSON.parse(lista);
        lista.push({ id:idItem, nome:nome, quantidade:quantidade})

        localStorage.setItem('lista', JSON.stringify(lista)) 
    }else{
        lista = [{nome:nome, quantidade:quantidade}]
        localStorage.setItem('lista', JSON.stringify(lista)) 
    }
    listAllItem()
} 

function listAllItem() {
    const tabela = document.getElementById('produtos')
    tabela.innerHTML = ''
    const arrayItens = getLocalData();
    arrayItens.map((item)=>{
        tabela.innerHTML = tabela.innerHTML + `
        <tr>
        <td>${item.nome}</td>
        <td>${item.quantidade}</td>
        <td>
            <button onclick="deleteItem(${item.id})">
                excluir
            </button>
        </td>
        </tr>
     ` 
    })
    totalItens()

}

function deleteItem(id) {
    const arrayItens = getLocalData()
    const deleted = arrayItens.filter((item)=>{
        return item.id != id
    })
    localStorage.setItem('lista', JSON.stringify(deleted))
    listAllItem()
}

function totalItens(){
    const arrayItens = getLocalData();
    let total = 0;
    arrayItens.forEach(item => {
        total = Number(item.quantidade) + total
    });
    const elementTotal = document.getElementById('total')
    elementTotal.innerHTML = `
    <td>Total de produtos: ${arrayItens.length}</td>
    <td>Total de itens: ${total}</td>
    <td>
        <button onclick="deleteAllItens()">
            excluir tudo
        </button>
    </td>
     `

}

function deleteAllItens() {
    localStorage.setItem('lista', "[]")
    listAllItem()
}

function getLocalData(){
    const itens = localStorage.getItem('lista')
    const arrayItens = JSON.parse(itens)
    return arrayItens

}

