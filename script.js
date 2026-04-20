document
  .getElementById ('petAgendamentoForm')
  .addEventListener ('submit', function (event) {
    event.preventDefault ();

    // Pega os dados
    const dono = document.getElementById ('nomeDono').value;
    const pet = document.getElementById ('nomePet').value;
    const servico = document.getElementById ('servicoPet').value;
    const periodo = document.getElementById ('periodoPet').value;

    // Número do WhatsApp (somente números)
    const telefone = '5512981080880';

    // Mensagem formatada para o lojista
    const mensagem =
      `🐾 *NOVO AGENDAMENTO PET* 🐾%0A%0A` +
      `*Dono:* ${dono}%0A` +
      `*Pet:* ${pet}%0A` +
      `*Serviço:* ${servico}%0A` +
      `*Período:* ${periodo}%0A%0A` +
      `Quais horários disponíveis?`;

    // Abrir link
    window.open (
      `https://api.whatsapp.com/send?phone=${telefone}&text=${mensagem}`,
      '_blank'
    );
  });

// Detecta mudança de orientação para garantir o bloqueio
window.addEventListener ('orientationchange', function () {
  if (window.orientation === 90 || window.orientation === -90) {
    document.getElementById ('bloqueio-rotacao').style.display = 'flex';
  } else {
    document.getElementById ('bloqueio-rotacao').style.display = 'none';
  }
});

// Função para carregar os serviços do JSON
async function carregarServicos () {
  try {
    const response = await fetch ('servicos.json');
    const data = await response.json ();
    const grid = document.querySelector ('.servicos-grid');

    // Limpa o grid atual
    grid.innerHTML = '';

    data.servicos.forEach (servico => {
      // Localize esta parte dentro do seu script.js e substitua:
      const card = `
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front" style="background-color: ${servico.cor_frente}">
                    <div class="menu-item">
                        <span class="servico-nome">${servico.nome}</span>
                        <span class="servico-preco">${servico.preco}</span>
                    </div>
                </div>
                <div class="flip-card-back" style="background-color: ${servico.cor_verso}">
                    <p>${servico.descricao}</p>
                </div>
            </div>
        </div>
    `;
      grid.innerHTML += card;
    });
  } catch (error) {
    console.error ('Erro ao carregar serviços:', error);
  }
}

// Chama a função ao carregar a página
document.addEventListener ('DOMContentLoaded', carregarServicos);
