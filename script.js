/*
const enabled = document.querySelector("#enabled");

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
const cstatus = document.querySelector("#status");

// Detecta caso tenha clique em algum botão
var botoes = document.querySelectorAll("button");
for (let i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", () => {
        // alert(botoes[i].innerHTML);
        enviar(botoes[i].innerHTML);
    })
}

function enviar(local) {
    cstatus.textContent = 'Enviando...';
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
                cstatus.textContent = 'Erro HTTP: ' + response.status;
                cstatus.style.color = 'red'
                throw new Error('Erro HTTP: ' + response.status);
            }

            return response.json();
        })
        .then(data => {
            if (data.retorno == 1) {
                cstatus.textContent = 'Sucesso';
                cstatus.style.color = '#13fc03'
            } else {
                cstatus.textContent = 'Erro: ' + data.retorno;
                cstatus.style.color = 'red'
            }
        })
        .catch(error => cstatus.textContent = 'Erro: ' + error);
}