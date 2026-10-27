// Detecta caso tenha clique em algum botão
var botoes = document.querySelectorAll("button");
for (let i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", () => {
        // alert(botoes[i].innerHTML);
        enviar(botoes[i].innerHTML);
    })
}

function enviar(local) {
    returnStatus('Enviando');
    fetch(postURL + matricula, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            local: local
        })
    })
        .then(response => {
            if (!response.ok) {
                returnStatus('Erro HTTP: ' + response.status, 'red');
                throw new Error('Erro HTTP: ' + response.status);
            }

            return response.json();
        })
        .then(data => {
            if (data.retorno == 1) {
                returnStatus('Sucesso', '#13fc03');
            } else {
                returnStatus('Erro: ' + data.retorno, 'red')
            }
        })
        .catch(error => returnStatus('Erro: ' + error, 'red'));
}

function returnStatus(msg, cor) {
    const cstatus = document.querySelector("#status");

    cstatus.textContent = msg;
    cstatus.style.color = cor;
}