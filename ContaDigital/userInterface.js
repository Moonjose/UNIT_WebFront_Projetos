// Seleciona os botões da interface
const buttons = document.querySelectorAll('.buttons-box button');
const transactionBox = document.querySelector('.transactions-box');

// Estado inicial: transações vazias
renderInicioTransacoes();

// HTML da Área PIX
const pixContent = `
  <h3 class="section-title">Área PIX</h3>
  <div class="pix-header" id="btn-voltar-transacoes">
    <img src="images/transactions_icon.png" />
    <h4 class="section-title">Transações</h4>
  </div>

  <div class="pix-tabs">
    <button id="tab-receber" class="active">
      <img src="images/receive_icon.png" alt="Receber" />
      Receber
    </button>
    <button id="tab-transferir">
      <img src="images/transfer_icon.png" alt="Transferir" />
      Transferir
    </button>
  </div>

  <div id="form-receber" class="pix-form">
    <label class="label">CNPJ/CPF</label>
    <input type="text" id="cpf-receber">

    <label class="label">Valor R$</label>
    <input type="text" id="valor-receber">

    <p class="error-msg hidden">Todos os campos devem ser preenchidos!</p>

    <div class="form-buttons">
      <button id="btn-receber">RECEBER</button>
    </div>
  </div>

  <div id="form-transferir" class="pix-form hidden">
    <label class="label">Chave PIX</label>
    <input type="text" id="chave-transferir">

    <label class="label">Valor R$</label>
    <input type="number" id="valor-transferir">

    <p class="error-msg hidden">Todos os campos devem ser preenchidos!</p>

    <div class="form-buttons">
      <button id="btn-transferir">TRANSFERIR</button>
    </div>
  </div>
`;

// Mostra a tela inicial de transações vazias
function renderInicioTransacoes() {
  transactionBox.innerHTML = `
    <h3 class="section-title">Últimas transações</h3>
    <p class="system-message">Não constam transações.</p>
  `;
}

// Mostra mensagem de sistema indisponível
function renderIndisponivel(titulo) {
  transactionBox.innerHTML = `
    <h3 class="section-title">${titulo}</h3>
    <p class="system-message">Sistema indisponível.<br>Tente novamente mais tarde.</p>
  `;
}

// Renderiza a área PIX e ativa eventos internos
function renderPix() {
  transactionBox.innerHTML = pixContent;

  // Alternância entre abas
  document.getElementById('tab-receber').addEventListener('click', () => {
    document.getElementById('form-receber').classList.remove('hidden');
    document.getElementById('form-transferir').classList.add('hidden');
    document.getElementById('tab-receber').classList.add('active');
    document.getElementById('tab-transferir').classList.remove('active');
  });

  document.getElementById('tab-transferir').addEventListener('click', () => {
    document.getElementById('form-transferir').classList.remove('hidden');
    document.getElementById('form-receber').classList.add('hidden');
    document.getElementById('tab-transferir').classList.add('active');
    document.getElementById('tab-receber').classList.remove('active');
  });

  // Botão de "voltar"
  document.getElementById('btn-voltar-transacoes').addEventListener('click', renderInicioTransacoes);
}

// Liga os botões aos respectivos renders
buttons[0].addEventListener('click', renderPix); // Área PIX
buttons[1].addEventListener('click', () => renderIndisponivel("Pagar")); // Pagar
buttons[2].addEventListener('click', () => renderIndisponivel("Investir")); // Investir
