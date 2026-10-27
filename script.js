/*
const enabled = document.querySelector("#enabled");
const status = document.querySelector("#status");

// Restaura a configuração salva.
chrome.storage.local.get({ enabled: false }, (data) => {
    enabled.checked = data.enabled;
    status.textContent = data.enabled ? "Ativo" : "Desativado";
});

// Salva a configuração quando o switch muda.
enabled.addEventListener("change", async () => {
    await chrome.storage.local.set({
        enabled: enabled.checked
    });

    status.textContent = enabled.checked
        ? "Ativo"
        : "Desativado";
});*/

const execute = document.querySelector("#execute");

// Detecta caso tenha clique em algum botão
var botoes = document.querySelectorAll("button");
for (let i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", () => {
        // alert(botoes[i].innerHTML);
        enviar(botoes[i].innerHTML);
    })
}

function enviar(local) {
    fetch(postURL + matricula, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            local: local
        })
    })
        .then(response => response.json())
        .then(data => {
            alert('Resposta do servidor:', data.retorno);
            if (data.retorno == 1) {
                // input.value = "";
                // carregarMensagens(protocolo);
                // carregarMensagensNovas(protocolo);
                // chatDrop();
                alert("ok");
                enviando = false;
            } else {
                alert('Ocorreu um erro inesperado. Favor contatar o setor de T.I. e informar o seguinte código:<br>Retorno: ' + data.retorno);
            }
        })
        .catch(error => alert('Erro:', error));
}