// Selecionar todos os elementos com a classe "bloco" e a área onde eles serão soltos
const blocos = document.querySelectorAll(".bloco");
const areaSoltar = document.querySelector(".bloco_area");
// Selecionar o botão de executar   
const botao = document.getElementById("executar");
let btnOutro;
let blocoOrigem = {};
const meuDialogo = document.getElementById('dialogSucesso');
const meuDialogo2 = document.getElementById('dialogFalha');
const fecharDialogoSuc = document.getElementById('fecharDialogoSucesso');
const fecharDialogoFal = document.getElementById('fecharDialogoFalha');

// Buscar o botão do nivel 2
fetch ("../html/niveis.html")
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Encontrar o botão com id "nivel2" no conteúdo do arquivo
        btnOutro = doc.querySelector('#nivel2');

        if (btnOutro) {
            console.log('Botão encontrado:', btnOutro.textContent);
            btnOutro.removeAttribute("disabled");
        } else {
            console.log('Botão não encontrado na página.');
        }
    })

// Armazenar a posição original dos blocos e adicionar um ouvinte de arrasto
blocos.forEach((blo) => {
    blocoOrigem[blo.id] = {parent: blo.parentElement, nextSibling: blo.nextSibling};
    blo.addEventListener("dragstart", comecarA);
})

// Função para verificar se os blocos estão na posição correta (Nível 1)
function nivel1() {

    const divArea = areaSoltar.querySelectorAll(".bloco");
    let blocosCorretos = true;

    // Verificar se todos os blocos estão na área correta
    divArea.forEach((div) => {
        if (div.id !== "create") {
            blocosCorretos = false;
            return;
        }
    })

    if (blocosCorretos) {
        console.log('Botão encontrado:', btnOutro.textContent);
        btnOutro.disabled = false;

        // Armazenar o estado do botão no armazenamento local
        localStorage.setItem('nivel2Ativo', 'true');

        console.log("correto");
        meuDialogo.showModal(); // abrir o modal
    } else {
        console.log("incorreto");
        // Desabilitar o botão novamente e recarregar a página
        botao.setAttribute("disabled", "true");
        meuDialogo2.showModal();
        /* window.location.reload(); */
    }
}

// Função para marcar o elemento em arrasto
function comecarA(){
    this.classList.add("arrastando"); /* Elemento que estou arrastando */
}

// Função para soltar o elemento na área
function soltar(){

    const elemento = document.querySelector(".arrastando");
    this.appendChild(elemento); /* adicioando na area */
    botao.removeAttribute("disabled");
}

// Adicionar um ouvinte para detectar o evento "dragover" na área de soltar
areaSoltar.addEventListener("dragover", soltar);

// Função para redirecionar para a página de níveis
function niveis() {
    window.location = "../html/niveis.html";
}

// fechar o dialog
fecharDialogoSuc.addEventListener('click', () => {
    meuDialogo.close();
});

fecharDialogoFal.addEventListener('click', () => {
    meuDialogo2.close();
    window.location.reload();
})

function recomecar() {
    window.location.reload();
}