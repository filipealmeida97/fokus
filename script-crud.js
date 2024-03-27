// Encontrar elementos do DOM e guardar em uma constante
const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');
const btnCancelarFormulario = document.querySelector('.app__form-footer__button--cancel');
const btnRemoverConcluídas = document.querySelector('#btn-remover-concluidas');
const btnRemoverTodas = document.querySelector('#btn-remover-todas');

//Recuperando a lista de tarefas, fazendo o caminho inverso para converter a string em objeto
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

let tarefaSelecionada = null;
let liTarefaSelecionada = null;
//Função para atualizar a lista de tarefas
function atualizarTarefas() {
    console.log(tarefas);
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

    if (tarefa.completa){
        
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled','disabled');
    }else{
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active').forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active');
            });
            if(tarefaSelecionada == tarefa){
                paragrafoDescricaoTarefa.textContent = '';
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                return;
            }
            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li;
            paragrafoDescricaoTarefa.textContent = tarefa.descricao;
            li.classList.toggle('app__section-task-list-item-active');

        }
    }

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
    //inserir item a lista de tarefas
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); //setItem(<referência>, <lista>)
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

//Ouvinte do evento customizável criado no sript.js quando tempo foco terminar
document.addEventListener('FocoFinalizado', () => {
    if(tarefaSelecionada && liTarefaSelecionada){
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        paragrafoDescricaoTarefa.textContent = '';
        liTarefaSelecionada.querySelector('.app_button-edit').setAttribute('disabled','disabled');
        tarefaSelecionada.completa = true;
        atualizarTarefas();
    }
});

//Remover tarefas concluídas quando o botão remover for clicado
const removerTarefas = (somenteCompletas) => {
    const seletor = somenteCompletas ? '.app__section-task-list-item-complete' : ".app__section-task-list-item";
    paragrafoDescricaoTarefa.textContent = '';
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();
    });
    tarefas = somenteCompletas ?  tarefas.filter(tarefa => !tarefa.completa ) : [];
    atualizarTarefas();
}

btnRemoverConcluídas.onclick = () => removerTarefas(true);
btnRemoverTodas.onclick = () => removerTarefas(false);

