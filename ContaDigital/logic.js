let saldo = 0;
let entradas = 0;
let saidas = 0;
let historicoTransacoes = [];

function gerarId() {
  return Math.floor(Math.random() * 1000000);
}

function obterDataHora() {
  const now = new Date();
  return now.toLocaleString();
}

function atualizarSaldo() {
  document.getElementById('saldo').textContent = `R$ ${saldo.toFixed(2)}`;
  document.getElementById('entradas').textContent = `R$ ${entradas.toFixed(2)}`;
  document.getElementById('saidas').textContent = `R$ ${saidas.toFixed(2)}`;
}

function adicionarTransacao(tipo, descricao, valor) {
  const id = gerarId();
  const data = obterDataHora();

  let descricaoCompleta = '';
  if (tipo === 'entrada') {
    descricaoCompleta = `Tipo: Transferência recebida — De: ${descricao}`;
  } else {
    descricaoCompleta = `Tipo: Transferência enviada — Para: ${descricao}`;
  }

  historicoTransacoes.push({ id, tipo, descricao: descricaoCompleta, valor, data });
}

function renderHistorico() {
  const lista = document.getElementById('lista-transacoes');
  if (!lista) return;

  lista.innerHTML = '';

  if (historicoTransacoes.length === 0) {
    lista.innerHTML = `<li id="sem-transacoes">Não constam transações.</li>`;
  } else {
    historicoTransacoes.forEach(t => {
      const li = document.createElement('li');
      li.className = t.tipo === 'entrada' ? 'transaction-in' : 'transaction-out';
      li.setAttribute('data-icon', t.tipo === 'entrada' ? '⬇' : '⬆');

      li.innerHTML = `
        <div class="transaction-details">
          <span><strong>${t.tipo === 'entrada' ? 'Entrada' : 'Saída'}</strong> - R$ ${t.valor.toFixed(2)}</span>
          <span class="transaction-id">ID: ${t.id}</span>
          <span>${t.tipo === 'entrada' ? 'Recebida' : 'Enviada'} em ${t.data}</span>
          <span class="transaction-desc">${t.descricao}</span>
        </div>
      `;

      lista.appendChild(li);
    });
  }
}

function showMessage(type, text) {
  const msgBox = document.getElementById("feedback");
  if (!msgBox) return;

  msgBox.className = `feedback-message feedback-${type}`;
  msgBox.textContent = text;
  msgBox.classList.remove("hidden");

  setTimeout(() => {
    msgBox.classList.add("hidden");
  }, 4000);
}

function configurarEventosPix() {
  const btnReceber = document.getElementById('btn-receber');
  const btnTransferir = document.getElementById('btn-transferir');

  if (btnReceber) {
    btnReceber.addEventListener('click', () => {
      const cpf = document.getElementById('cpf-receber').value.trim();
      const valorStr = document.getElementById('valor-receber').value.trim();
      const valor = parseFloat(valorStr.replace(',', '.'));

      if (!cpf || isNaN(valor) || valor <= 0) {
        showMessage("error", "Preencha CPF e valor válido para receber.");
        return;
      }

      saldo += valor;
      entradas += valor;
      atualizarSaldo();
      adicionarTransacao('entrada', cpf, valor);
      // NÃO chama renderHistorico aqui porque tela PIX não tem lista
      showMessage("success", "Recebimento efetuado com sucesso!");

      document.getElementById('cpf-receber').value = '';
      document.getElementById('valor-receber').value = '';
    });
  }

  if (btnTransferir) {
    btnTransferir.addEventListener('click', () => {
      const chave = document.getElementById('chave-transferir').value.trim();
      const valorStr = document.getElementById('valor-transferir').value.trim();
      const valor = parseFloat(valorStr.replace(',', '.'));

      if (!chave || isNaN(valor) || valor <= 0) {
        showMessage("error", "Preencha a chave PIX e um valor válido para transferir.");
        return;
      }

      if (valor > saldo) {
        showMessage("error", "Saldo insuficiente para essa transferência.");
        return;
      }

      saldo -= valor;
      saidas += valor;
      atualizarSaldo();
      adicionarTransacao('saida', chave, valor);
      // NÃO chama renderHistorico aqui porque tela PIX não tem lista
      showMessage("success", "Transferência realizada com sucesso!");

      document.getElementById('chave-transferir').value = '';
      document.getElementById('valor-transferir').value = '';
    });
  }
}

function inicializarPix() {
  atualizarSaldo();
  configurarEventosPix();
}
