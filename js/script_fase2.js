const blocos = document.querySelectorAll(".bloco");
const areaSoltar = document.querySelector(".bloco_area");
const botao = document.getElementById("executar");
let blocoOrigem = {};
let btnOutro;
const meuDialogo = document.getElementById('dialogSucesso');
const meuDialogo2 = document.getElementById('dialogFalha');
const fecharDialogoSuc = document.getElementById('fecharDialogoSucesso');
const fecharDialogoFal = document.getElementById('fecharDialogoFalha');

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

// Armazenar a posição original dos blocos e adicionar um ouvinte de arrasto
blocos.forEach((blo) => {
    blocoOrigem[blo.id] = {parent: blo.parentElement, nextSibling: blo.nextSibling};
    blo.addEventListener("dragstart", comecarA);
})

// Buscar o botão do nivel 3
fetch ("../html/niveis.html")
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Encontrar o botão com id "nivel2" no conteúdo do arquivo
        btnOutro = doc.querySelector('#nivel3');

        if (btnOutro) {
            console.log('Botão encontrado:', btnOutro.textContent);
            btnOutro.removeAttribute("disabled");
        } else {
            console.log('Botão não encontrado na página.');
        }
    })

// Função para verificar se os blocos estão na posição correta (Nível 2)
function nivel2() {

    const divArea = areaSoltar.querySelectorAll(".bloco");
    let blocosCorretos = true;

    // Verificar se todos os blocos estão na área correta
    divArea.forEach((div) => {
        if (div.id !== "select") {
            blocosCorretos = false;
            return;
        }
    })

    if (blocosCorretos) {
        console.log('Botão encontrado:', btnOutro.textContent);
        btnOutro.disabled = false;

        // Armazenar o estado do botão no armazenamento local
        localStorage.setItem('nivel3Ativo', 'true');

        console.log("correto");
        meuDialogo.showModal(); // abrir o modal
    } else {
        console.log("incorreto");
        // Desabilitar o botão novamente e recarregar a página
        botao.setAttribute("disabled", "true");
        meuDialogo2.showModal();
    }
}

function niveis() {
    window.location = "../html/niveis.html";
}

function proximaF3() {
    window.location = "../html/fase3.html";
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