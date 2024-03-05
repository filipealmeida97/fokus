const formPrincipal = document.querySelector('#form-principal');
const btnMostrarForm = document.querySelector('#btnMostrarForm');
const textArea = document.querySelector('.textArea');

const tarefas = [];

btnMostrarForm.addEventListener('click', () => {
    formPrincipal.classList.toggle('visually-hidden');
});

formPrincipal.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const tarefa = {
        descricao: textArea.value
    }

    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
});
