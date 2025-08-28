document.addEventListener('DOMContentLoaded', () => {
  // Lista de produtos sem Bones e Meias
  const produtos = [
    {id: 1, nome: "Kit Camisas", preco: 50, img: "img/camisa.jpg"},
    {id: 2, nome: "Kit Calças", preco: 80, img: "img/calca.jpg"},
    {id: 3, nome: "Kit Tênis", preco: 120, img: "img/tenis.jpg"}
  ];

  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  const produtosDiv = document.getElementById('produtos');
  const itensCarrinhoDiv = document.getElementById('itensCarrinho');
  const totalSpan = document.getElementById('total');

  // Comentários
  const formComentario = document.getElementById('formComentario');
  const listaComentarios = document.getElementById('listaComentarios');
  let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

  function mostrarProdutos() {
    produtosDiv.innerHTML = '';
    produtos.forEach(prod => {
      const div = document.createElement('div');
      div.className = 'produto';
      div.innerHTML = `
        <div class="produto-top">
          <img src="${prod.img}" alt="${prod.nome}">
          <h3>${prod.nome}</h3>
          <p>R$ ${prod.preco}</p>
        </div>
        <button onclick="adicionarCarrinho(${prod.id})">Adicionar ao Carrinho</button>
      `;
      produtosDiv.appendChild(div);
    });
  }

  window.adicionarCarrinho = function(id) {
    const produto = produtos.find(p => p.id === id);
    const item = carrinho.find(i => i.id === id);
    if (item) {
      item.quantidade++;
    } else {
      carrinho.push({...produto, quantidade: 1});
    }
    atualizarCarrinho();
  }

  window.removerCarrinho = function(id) {
    carrinho = carrinho.filter(i => i.id !== id);
    atualizarCarrinho();
  }

  function atualizarCarrinho() {
    itensCarrinhoDiv.innerHTML = '';
    let total = 0;
    carrinho.forEach(item => {
      total += item.preco * item.quantidade;
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        ${item.nome} x${item.quantidade} - R$ ${item.preco * item.quantidade}
        <button onclick="removerCarrinho(${item.id})">Remover</button>
      `;
      itensCarrinhoDiv.appendChild(div);
    });
    totalSpan.textContent = total;
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  // Comentários
  function mostrarComentarios() {
    listaComentarios.innerHTML = '';
    comentarios.forEach(c => {
      const div = document.createElement('div');
      div.className = 'comentarioItem';
      div.innerHTML = `<strong>${c.nome}</strong>${c.texto}`;
      listaComentarios.appendChild(div);
    });
  }

  formComentario.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nomeComentario').value;
    const texto = document.getElementById('textoComentario').value;
    comentarios.push({nome, texto});
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
    formComentario.reset();
    mostrarComentarios();
  });

  // Inicializa
  mostrarProdutos();
  atualizarCarrinho();
  mostrarComentarios();
});
