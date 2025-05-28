let numeroSecreto;
let tentativas = 0;
const maxTentativas = 5;

function iniciarJogo() {
  const input = document.getElementById('numeroOculto');
  numeroSecreto = parseInt(input.value);
  if (isNaN(numeroSecreto)) {
    alert("Digite um número válido.");
    return;
  }
  document.getElementById('jogo').style.display = 'block';
  input.disabled = true;
}

function verificarPalpite() {
  const palpite = parseInt(document.getElementById('palpite').value);
  tentativas++;

  const mensagem = document.getElementById('mensagem');
  const tentativasRestantes = maxTentativas - tentativas;

  if (isNaN(palpite)) {
    alert("Digite um número válido.");
    return;
  }

  if (palpite === numeroSecreto) {
    mensagem.innerText = "🎉 Parabéns! Você acertou!";
    mensagem.style.backgroundColor = "#a8e6cf";
    document.getElementById('palpite').disabled = true;
  } else if (tentativas >= maxTentativas) {
    mensagem.innerText = `😞 Fim de jogo! O número era ${numeroSecreto}.`;
    mensagem.style.backgroundColor = "#ff8a80";
    document.getElementById('palpite').disabled = true;
  } else {
    const dica = palpite > numeroSecreto ? "menor" : "maior";
    mensagem.innerText = `❌ Errou! O número é ${dica}.`;
    mensagem.style.backgroundColor = "#ffe082";
    document.getElementById('tentativas').innerText = `Tentativas restantes: ${tentativasRestantes}`;
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const numeroOcultoInput = document.getElementById('numeroOculto');
    const palpiteInput = document.getElementById('palpite');

    if (!numeroOcultoInput.disabled && numeroOcultoInput === document.activeElement) {
      iniciarJogo();
    }

    if (!palpiteInput.disabled && palpiteInput === document.activeElement) {
      verificarPalpite();
    }
  }
});
