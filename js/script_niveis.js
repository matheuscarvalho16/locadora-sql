function nivel1() {
    window.location = "../html/fase1.html";
}

function nivel2() {
    window.location = "../html/fase2.html";
}

function nivel3() {
    window.location = "../html/fase3.html";
}

function nivel4() {
    window.location = "../html/fase4.html";
}

function reiniciarJogo() {
    console.log("reiniciar");
    localStorage.removeItem("nivel2Ativo");
    window.location = "../index.html";
}