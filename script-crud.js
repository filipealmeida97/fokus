// Encontrar o botão adicionar tarefa
const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const btnCancelarFormulario = document.querySelector('.app__form-footer__button--cancel');

//Recuperando a lista de tarefas, fazendo o caminho inverso para converter a string em objeto
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

//Função para atualizar a lista de tarefas
function atualizarTarefas() {
    
    //inserir item a lista de tarefas
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); //setItem(<referência>, <lista>)

}

//Função para criar o elemento na lista de tarefa
function criarElementoTarefa(tarefa){
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;

    const paragrafo = document.createElement('p');
    paragrafo.classList.add('app__section-task-list-item-description');
    paragrafo.textContent = tarefa.descricao;

    const botao = document.createElement('button');
    const imagemBotao  = document.createElement('img');
    botao.classList.add('app_button-edit');

    botao.onclick = () => {
        const novaDescricao = prompt('Qual o novo nome da tarefa?');
        if (novaDescricao) {            
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas();
        }
    }

    imagemBotao.setAttribute('src', './imagens/edit.png');
    botao.append(imagemBotao);
    
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    return li;
}

//Evento quando o botão 'Adicionar tarefa' for clicado
btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
});

//Evento quando o botão 'Cancelar' for clicado
btnCancelarFormulario.addEventListener('click', () => {
    textArea.value = '';
    formAdicionarTarefa.classList.add('hidden');
});

//Evento quando o formulário for para envio
formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();//Impedir o comportamento padrão
    const tarefa = {
        descricao: textArea.value
    };
    tarefas.push(tarefa);

    const elementoTarefa = criarElementoTarefa(tarefa);
    //Incluir nova tarefa no elemento DOM
    ulTarefas.append(elementoTarefa);
    //Limpar textarea
    textArea.value = '';
    //Esconder formulário
    formAdicionarTarefa.classList.add('hidden');
});

//Aplica os dados da listagem no documento DOM
tarefas.forEach(tarefa => {
    //Chama a função que criar o Elemento(item da listagem)
    const elementoTarefa = criarElementoTarefa(tarefa);
    //Adiciona o elemento item a lsitagem geral
    ulTarefas.append(elementoTarefa);
});