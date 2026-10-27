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
        alert(botoes[i].innerHTML);
    })
}

execute.addEventListener("click", () => {
    alert("Executando ação da extensão...");
});