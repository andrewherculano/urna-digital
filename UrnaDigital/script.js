let seuVotoPara = document.querySelector('.divi-1-1 span');
let cargo = document.querySelector('.divi-1-2 span');
let descricao = document.querySelector('.divi-1-4');
let aviso = document.querySelector('.divi-2');
let lateral = document.querySelector('.divi-1-right');
let numeros = document.querySelector('.divi-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHTML = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHTML += '<div class="num-voto pisca"></div>';
        }
        else {
            numeroHTML += '<div class="num-voto"></div>';
        }

    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero == numero) {
            return true;
        }
        else {
            return false;
        }
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML =
            `Nome: ${candidato.nome}<br/>
        Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="divi-1-image menor"><img src="images/${candidato.fotos[i].url}" alt="" /> ${candidato.fotos[i].legenda} </div>`
            }
            else {
                fotosHtml += `<div class="divi-1-image"><img src="images/${candidato.fotos[i].url}" alt="" /> ${candidato.fotos[i].legenda} </div>`
            }

        }

        lateral.innerHTML = fotosHtml;

    }
    else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO!</div>'
    }

}

function clicou(n) {
    let elNumero = document.querySelector('.num-voto.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        }
        else {
            atualizaInterface();
        }

    }
}

function branco() {
    if (numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>'
    }
    else {
        alert('Para votar em BRANCO, todos os campos devem estar vazios')
    }
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });

    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if (votoConfirmado) {
        etapaAtual++;
        console.log(etapas[etapaAtual]);
        if (etapas[etapaAtual] != undefined) {
            comecarEtapa();
        }
        else {
            document.querySelector('.tela').innerHTML = '<div class="aviso-fim pisca">FIM</div>'
            console.log(votos);
        }

    }

}

comecarEtapa();