const celulas = document.querySelectorAll(".celula");
let fimDeJogo = false;

const JOGADOR_X = "X";
const JOGADOR_O = "O";

const COMBINACOES = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

document.addEventListener("click", (event) =>{
if(event.target.matches(".celula.X") || event.target.matches(".celula.O")){
    jogadaExistente();
    
}else{
     if(event.target.matches(".celula")){
        jogar(event.target.id, JOGADOR_X);
        setTimeout(() => bot(), 500);
    }
}
   

});

function bot(){
    const posicoesDisponiveis = [];
    for (index in celulas) {
        if(!isNaN(index)){
            if(!celulas[index].classList.contains("X") && !celulas[index].classList.contains("O")){
                posicoesDisponiveis.push(index);
            }
        }
    }
    const posicaoAleatoria = Math.floor(Math.random() * posicoesDisponiveis.length);

    if(!fimDeJogo){
        jogar(posicoesDisponiveis[posicaoAleatoria], JOGADOR_O);
    }
    
}

function jogar(id, turno){
    const celula = document.getElementById(id);

    celula.textContent = turno;
    celula.classList.add(turno)

    checarVencedor(turno);      
}

function checarVencedor(turno){
    const vencedor = COMBINACOES.some((cond) =>{
        return cond.every((index) => {
            return celulas[index].classList.contains(turno);
        })
    });
    if(vencedor){
        encerrarJogo(turno);
    }else if(checarEmpate()){
        encerrarJogo();
    }

}

function checarEmpate(){
    let x = 0;
    let o = 0;

    for (const index in celulas) {
        if(!isNaN(index)){
          if (celulas[index].classList.contains(JOGADOR_X)) {
           x++;            
        }
        if (celulas[index].classList.contains(JOGADOR_O)) {
            o++;            
         }  
        }
    }
    return x + o === 9 ? true : false;
}

function encerrarJogo(vencedor = null){
    fimDeJogo = true;
    const telaFimJogo = document.getElementById("fim-de-jogo");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    let mensagem = null;

    telaFimJogo.style.display = "block";
    telaFimJogo.appendChild(h2);
    telaFimJogo.appendChild(h3);

    if(vencedor){
       h2.innerHTML = `O player <span>${vencedor}</span> venceu`;
    }else{
        h2.innerHTML = "Deu velha!";
    }

    let contador = 3;
    setInterval(() => {
        h3.innerHTML = `Reiniciando em ${contador--}`;
    }, 1000);

    setTimeout(() => {
        location.reload();
    }, 4000);
}

function jogadaExistente(){
    const telaJogadaExistente = document.getElementById("escolha-outra-jogada");
    const h2 = document.createElement("h2");

    h2.innerHTML = "Escolha Outra Jogada!";

    telaJogadaExistente.style.display = "block";
    telaJogadaExistente.appendChild(h2);

    setTimeout(() => { 
        telaJogadaExistente.style.display = "none";
        h2.innerHTML = null;
    }, 1000);
}
