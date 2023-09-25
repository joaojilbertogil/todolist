let banco = [];
const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];

const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

const inputItem = (tarefa, status, indice) => {
    const item = document.createElement('div');
    item.classList.add('todo_item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}></input>
        <section>${tarefa}</section>
        <button class="delete-button" data-indice=${indice}>X</button>
    `;

    const section = item.querySelector('section');
    const checkbox = item.querySelector('input[type="checkbox"]');

    if (status === 'checked') {
        section.style.textDecoration = 'line-through';
    }

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            section.style.textDecoration = 'line-through';
        } else {
            section.style.textDecoration = 'none';
        }

        atualizaItem(indice, checkbox.checked ? 'checked' : '');
    });

    document.getElementById('todoList').appendChild(item);

    const deleteButton = item.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        removeItem(indice);
    });
}

const atualizaView = () => {
    limpaTela();
    const banco = getBanco();
    banco.forEach((item, indice) => inputItem(item.tarefa, item.status, indice));
}

const limpaTela = () => {
    const lista = document.getElementById('todoList');
    while (lista.firstChild) {
        lista.removeChild(lista.lastChild);
    }
}

const insereItem = (event) => {
    const tecla = event.key;
    const value = event.target.value;

    if (tecla === 'Enter') {
        const banco = getBanco();
        banco.push({ 'tarefa': value, 'status': '' });
        setBanco(banco);
        atualizaView();
        event.target.value = '';
    }
}

const removeItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizaView();
}

const atualizaItem = (indice, status) => {
    const banco = getBanco();
    banco[indice].status = status;
    setBanco(banco);
}

document.getElementById('newItem').addEventListener('keypress', insereItem);
setBanco(banco);
atualizaView();