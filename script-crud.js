// Encontrar o botão adicionar tarefa

const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');

//Lista de tarefas (Array)
const tarefas = [];

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
});

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();//Impedir o comportamento padrão
    const tarefa = {
        descricao: textArea.value
    };
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); //setItem(<referência>, <lista>)
});