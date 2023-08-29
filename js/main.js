const tbody = document.getElementsByTagName("tbody")[0];
const busca = document.getElementById("search");
let alunos = getObjectLocalStorage("alunos");

if (alunos === null) {
    alunos = [];
    setObjectLocalStorage("alunos", alunos)
}

window.addEventListener("load", () => {
    for (let aluno of alunos){
        tbody.appendChild(createTrWithGivenValues(aluno.nome, aluno.faltas))
    }
})


const handleSubmit = () => {
    const nome = document.getElementsByName("nome")[0];
    const faltas = document.getElementsByName("faltas")[0];
    const aluno = {
        nome: nome.value,
        faltas: faltas.value        
    }
    nome.value = "";
    faltas.value = "0";

    alunos.push(aluno);
    setObjectLocalStorage("alunos", alunos);

    tbody.appendChild(createTrWithGivenValues(aluno.nome, aluno.faltas));
}


const createTrWithGivenValues = (nome, faltas) => {
    const tr = document.createElement("tr");
    const nomeTd = document.createElement("td");
    const faltasTd = document.createElement("td");
    tr.appendChild(nomeTd);
    tr.appendChild(faltasTd);

    nomeTd.innerText = nome;
    faltasTd.innerText = faltas;

    return tr;
}


function setObjectLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getObjectLocalStorage(key){
    var value = localStorage.getItem(key);
    return value && JSON.parse(value);
}

busca.addEventListener("input", () =>{
    const textoBusca = busca.value.toLowerCase();
    const linhas = tbody.getElementsByTagName("tr");
    alunos.forEach((valor, indice) => {
        if(!valor.nome.toLowerCase().includes(textoBusca)){
            linhas[indice].style.display = "none";
        } else {
            linhas[indice].style.display = "";
        }
    });
})
