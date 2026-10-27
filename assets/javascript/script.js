document.addEventListener("DOMContentLoaded", function () {
    var local = document.getElementById('local');
    var localAtual = document.getElementById('localAtual');
    var matricula = document.getElementById('matricula');
    var botoes = document.querySelectorAll("button");

    var nMatricula = null;

    // Restaura a matrícula salva
    chrome.storage.local.get({ matricula: "" }, (data) => {
        nMatricula = data.matricula; // Gambiarra, mas tá ok por enquanto
        matricula.value = data.matricula;
    });

    // Detecta caso tenha clique em algum botão
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].addEventListener("click", () => {
            var botao = botoes[i].innerHTML;
            if (botao == 'Fui') {
                const text = local.value;
                enviar(text);
            } else if (botao == 'Voltei') {
                enviar('TI');
            } else {
                enviar(botao);
            }
        })
    }

    // Enviar o local
    function enviar(local) {
        returnStatus('Enviando');
        fetch(postURL + matricula.value, {
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
                    document.getElementById('local').value = '';
                    getStatus();
                } else {
                    returnStatus('Erro: ' + data.retorno, 'red')
                }
            })
            .catch(error => returnStatus('Erro: ' + error, 'red'));
    }

    // Lista o local
    function getStatus() {
        if (nMatricula != null) {
            fetch(listaURL + nMatricula, {
                method: "GET"
            })
                .then(response => response.json())
                .then(data => {
                    localAtual.textContent = data.local + " - " + data.data;
                })
                .catch(error => {
                    localAtual.textContent = "Erro ao listar local:", error;
                });
        }
    }

    setTimeout(getStatus, 200);

    function returnStatus(msg, cor) {
        const cstatus = document.querySelector("#status");

        cstatus.textContent = msg;
        cstatus.style.color = cor;
    }

    // Realiza o envio se apertar Enter
    local.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            enviar(local.value);
        }
    });

    // Redireciona pro painel interno se clicar
    document.querySelector("h2").addEventListener("click", function () {
        chrome.tabs.create({
            url: painel
        });
    });

    // Salva a matrícula digitada
    matricula.addEventListener("input", () => {
        chrome.storage.local.set({
            matricula: matricula.value
        });
    });
});