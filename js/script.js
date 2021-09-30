//Pegando elementos que serão manipulados no dom:
let botao = $('.start');
let primeiraTela = $('.tela1');
let segundaTela = $('.tela2');

//Ocultando placar:
$('.placar').hide()

botao.click(function(){
    //Botão vai desaparecer e mensagem irá mudar:
    primeiraTela.hide(2000)
    segundaTela.show(3000)
})

/*Funções resposáveis por deixar o plano de fundo dos personagem preto e volta ao normal quando o mouse
sai de dentro do elemento:*/
function entrou(x){
    $('.' + x).css('background-color', 'black')
    $('.' + x).css('padding', '15px')
    $('.' + x).css('border-radius', '25px')
}

function saiu(x){
    $('.' + x).css('background-color', 'rgb(54, 25, 127)')
    $('.' + x).css('padding', '0px')
    $('.' + x).css('border-radius', '0px')
}

//Pegando div que serão adicionados os elementos:
let pecas = $('.pecas');
let listaPosicoes = [];

//Função responsavel por embaralhar as peças do jogo:
function shake(){
    const figuras = ['fas fa-cat', 'fas fa-crow', 'fas fa-dog' , 'fas fa-fish', 'fas fa-hippo', 
                'fas fa-otter', 'fas fa-horse-head', 'fas fa-frog', 'fas fa-kiwi-bird', 'fas fa-spider'];

    //Gerar numero aleatório:
    var aleatorio = Math.random();
    var regressiva = 10;

    //Tornandoo valor inteiro:
    aleatorio = aleatorio * regressiva;

    //Tirando as casas decimais;
    aleatorio = Math.floor(aleatorio);

    var contador = 0;

    var embaralhar = [];

    while(contador <= 10){
        //Pega um elemento aleatorio dentro do array:
        aleatorio = figuras[Math.floor(Math.random() * figuras.length)] 
                        
        //Controle do loop:
        contador += 1;
                        
        //Remove o elemento que foi escolhido aleatoriamente da lista:
        figuras.splice(figuras.indexOf(aleatorio), 1);

        //Adiciona o elemento aleatorio a lista chamada embaralhar:
        embaralhar.push(aleatorio);
        if (contador == 10) {
            contador = 0;
            break;
        }
    }

    return embaralhar
}

//Função responsavel por distribuir as peças embralharadas pelo tabuleiro:
function distribuir(valor){

    let embaralhar = shake()

    //Distribui os elementos na tela:
    let distribuir = 0;
    let controle = 0;
    let indentificador = valor

    while (controle < 10){
        if (distribuir >= 10) {
            distribuir = 0
        }
                
        pecas.append('<div id="'+ indentificador +'" class="t20 peca '+ embaralhar[controle] + ' fa-2x"</div>')

        //Salvando posições de cada peça para que o personagem robot use:
        listaPosicoes.push(embaralhar[controle])

        controle = controle + 1
        distribuir = distribuir + 1
        /* Para evitar que o usuário marque ponto ao apetar duas vezes na mesma tecla, verificamos o id da peça se ambos os id forem iguais é sinal que ele apertou na mesma peça, essa variável é de controle */
        indentificador = indentificador + 1
    }
}
//Distribuir 10 primeiras peças:
distribuir(1)

//Distribuir as ultimas 10 posições restantes:
distribuir(11)

let peca = $('.peca');
let verificarCliques = 1
let primeiraPeca  = null
let primeiroId = null
let segundaPeca = null
let segundoId = null
let pecasEncontradas = []
let maquinaEscolher = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
let pontosUser = 0;
let pontosMaquina = 0;

const mudarPontoUser = $('.user');
const mudarPontoMaquina = $('.machine');
mudarPontoUser.text(pontosUser);
mudarPontoMaquina.text(pontosMaquina);
let vezMaquina = 0
let posicao = 0
let jogarContra = null
let aviso = $('.aviso');

//Setando personagem escolhido pelo jogador
$('.astro').click(function(){
    $('.esconder').hide(1000)
    $('.partida').show(3000)
    $('.placar').show(2000)
    $('.icone').html('<i class="fas fa-user-astronaut"></i>')
    $('.mensagens').show()
    const musica = new Audio('musicas/Daft Punk - Lose Yourself to Dance.mp3');
    musica.play()
    jogarContra = 1
})

$('.robo').click(function(){
    $('.esconder').hide(1000)
    $('.partida').show(3000)
    $('.placar').show(2000)
    $('.icone').html('<i class="fas fa-robot"></i>')
    $('.mensagens').show()
    const musica = new Audio('musicas/PYLOT - The Return.mp3');
    musica.play()
    jogarContra = 2
})

aviso.html('Sua vez')

//Parte responsavel pelas funcionalidades do jogo:
peca.click(function(){
    //Variável que irá controlar a vez de jogar:
    if (verificarCliques == 1) {
        primeiraPeca = $(this).attr("class").split(' ')
        primeiraPeca = primeiraPeca[3]
        primeiroId = $(this).attr("id")
        if (pecasEncontradas.includes(primeiroId)) {
            verificarCliques = 1
        }else{
            //Mudando cor para aparecer elemento na tela:
            $('#'+ primeiroId).css('color', 'white')
            verificarCliques += 1
        }
    }else if(verificarCliques == 2){
        segundaPeca = $(this).attr("class").split(' ')
        segundaPeca = segundaPeca[3]
        segundoId = $(this).attr("id")
        if (pecasEncontradas.includes(segundoId) || primeiroId == segundoId) {
            verificarCliques = 1
        }else{
            //Mudando cor para aparecer elemento na tela:
            $('#'+ segundoId).css('color', 'white')
            verificarCliques += 1
            if (vezMaquina == 0) {
                if (primeiroId != segundoId && primeiraPeca === segundaPeca) {
                    aviso.html('Você marcou um ponto')
                    pecasEncontradas.push(primeiroId);
                    pecasEncontradas.push(segundoId);
                    apagar(parseInt(primeiroId))
                    apagar(parseInt(segundoId))
                    pontosUser += 1
                    mudarPontoUser.text(pontosUser);
                    verificarCliques = 1
                    if (maquinaEscolher.length == 0) {
                        aviso.html('Fim de jogo')
                    }
                }else{
                    aviso.html('Errou')
                    setTimeout(function(){
                        $('#'+ primeiroId).css('color', 'black');
                        $('#'+ segundoId).css('color', 'black');
                        verificarCliques = 1
                        $('.fas').css("pointer-events", "auto");
                        aviso.html('Vez da máquina')
                        if (jogarContra == 1) {
                            maquinaJogar()
                        }else if(jogarContra == 2){
                            robozinho()
                        }
                    }, 2000)
                    vezMaquina = 1
                }  
            }else{
                if (primeiroId != segundoId && primeiraPeca === segundaPeca) {
                    aviso.html('Máquina marcou um ponto')
                    pecasEncontradas.push(primeiroId);
                    pecasEncontradas.push(segundoId);
                    apagar(parseInt(primeiroId))
                    apagar(parseInt(segundoId))
                    pontosMaquina += 1
                    mudarPontoMaquina.text(pontosMaquina);
                    verificarCliques = 1
                    if (maquinaEscolher.length == 0) {
                        aviso.html('Fim de jogo')
                    }
                    setTimeout(function(){
                        aviso.html('Vez da máquina')
                        if (jogarContra == 1) {
                            maquinaJogar()
                        }else if(jogarContra == 2){
                            robozinho()
                        }
                    }, 2000)
                }else{
                    aviso.html('Máquina errou...')
                    setTimeout(function(){
                        $('#'+ primeiroId).css('color', 'black');
                        $('#'+ segundoId).css('color', 'black');
                        verificarCliques = 1
                        $('.fas').css("pointer-events", "auto");
                        aviso.html('Sua vez')
                    }, 2000)
                    vezMaquina = 0
                }  
            }
        }
    }
});

let escolha1 = null
let escolha2 = null

//Função responsavel pela primeiro personagem:
function maquinaJogar(){
    $('.fas').css("pointer-events", "none");

    function sortear(){
        escolha1 = maquinaEscolher[Math.floor(Math.random() * maquinaEscolher.length)]
        escolha2 = maquinaEscolher[Math.floor(Math.random() * maquinaEscolher.length)]
        return escolha1, escolha2
    }
            
    escolha1 = sortear()
    escolha2 = sortear()
    if (escolha1 == escolha2 || maquinaEscolher.length == 2) {
        escolha1 = maquinaEscolher[0]
        escolha2 = maquinaEscolher[maquinaEscolher.length - 1]
    }
            

    $('#' + escolha1).click()
    setTimeout(function(){
            $('#' + escolha2).click()
    }, 2000)

    console.log(maquinaEscolher)

}

//Apaga elementos que já foram escolhido, evitando que a máquina faça escolhas repetidas:
function apagar(x){
    posicao = maquinaEscolher.indexOf(x)
    maquinaEscolher.splice(posicao, 1)
}

let escolhaRobo = null
let fimJogo = 0

//Função responsavel pelo comportamento do segundo personagem:
function robozinho(){
    //Evita que o usuário aperte qualquer botão enquanto a máquina joga:
    $('.fas').css("pointer-events", "none");
    while (fimJogo <= 10){
        console.log(fimJogo)
        //Fazendo escolha:
        escolhaRobo = listaPosicoes[Math.floor(Math.random() * listaPosicoes.length)]
        if (escolhaRobo == 0) {
            if (fimJogo == 10) {
                aviso.html('Fim de jogo')
                break
            }else{
                continue
            }
        }else{
            fimJogo += 1
            break
        }
    }

    pecasIguais = []
    filtrarPosicoes = []

    contar = 0

    listaPosicoes.map(function(){
        if (escolhaRobo === listaPosicoes[contar]) {
            pecasIguais.push(contar)
        }
        contar += 1
    })
    //Array contendo todas as posições: 
    console.log(listaPosicoes)
    //Indentificação de peças iguais:
    console.log(pecasIguais)

    escolha1 = pecasIguais[0] + 1
    listaPosicoes[pecasIguais[0]] = 0
    escolha2 = pecasIguais[1] + 1
    listaPosicoes[pecasIguais[1]] = 0

    $('#' + escolha1).click()
            
    setTimeout(function(){
        $('#' + escolha2).click()
    }, 2000)
}