function abrirPagamento() {
  const transacoes = document.querySelector('.transactions-box');
  transacoes.innerHTML = `
    <h3>Pagar</h3>
    <div class="erro-pagamento">
      <p>Sistema indisponível.<br>Tente novamente mais tarde.</p>
    </div>
  `;
}
