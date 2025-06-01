let numeroSecreto;
let tentativas = 0;
const maxTentativas = 5;

function sortearNumero() {
  const min = parseInt(document.getElementById('min').value);
  const max = parseInt(document.getElementById('max').value);

  if (isNaN(min) || isNaN(max) || min >= max) {
    alert("Informe um intervalo válido (mínimo menor que o máximo).");
    return;
  }

  // Sorteia número aleatório com Math.random()
  numeroSecreto = Math.floor(Math.random() * (max - min + 1)) + min;
  tentativas = 0;

  // Oculta o painel do Jogador 1
  document.getElementById('painelJogador1').style.display = 'none';

  // Mostra o painel do Jogador 2
  document.getElementById('jogo').style.display = 'block';

  document.getElementById('palpite').disabled = false;
  document.getElementById('palpite').value = '';
  document.getElementById('mensagem').innerText = '';
  document.getElementById('tentativas').innerText = `Tentativas restantes: ${maxTentativas}`;

  // Apenas para testes
  console.log("Número secreto sorteado:", numeroSecreto);
}

function verificarPalpite() {
  const palpite = parseInt(document.getElementById('palpite').value);
  if (isNaN(palpite)) {
    alert("Digite um número válido!");
    return;
  }

  tentativas++;
  const tentativasRestantes = maxTentativas - tentativas;

  const mensagem = document.getElementById('mensagem');
  const inputPalpite = document.getElementById('palpite');

  if (palpite === numeroSecreto) {
    mensagem.innerText = "🎉 Parabéns! Você acertou!";
    mensagem.style.backgroundColor = "#a8e6cf";
    inputPalpite.disabled = true;
  } else if (tentativas >= maxTentativas) {
    mensagem.innerText = `😞 Fim de jogo! O número era ${numeroSecreto}.`;
    mensagem.style.backgroundColor = "#ff8a80";
    inputPalpite.disabled = true;
  } else {
    const dica = palpite > numeroSecreto ? "menor" : "maior";
    mensagem.innerText = `❌ Errou! O número é ${dica}.`;
    mensagem.style.backgroundColor = "#ffe082";
    document.getElementById('tentativas').innerText = `Tentativas restantes: ${tentativasRestantes}`;
  }
}
