var produto1 = {
  codigoProduto: "001",
  nomeProduto: "Computador Desktop Intel Core i5",
  precoDeVenda: 3199,
  disponivel: true,
  quantidade: 4
};

var produto2 = {
  codigoProduto: "002",
  nomeProduto: "Laptop Ultrabook Intel Core i7",
  precoDeVenda: 4799,
  disponivel: true,
  quantidade: 6
};

var produto3 = {
  codigoProduto: "003",
  nomeProduto: "Monitor LED 24 polegadas Full HD",
  precoDeVenda: 799.90,
  disponivel: true,
  quantidade: 10
};

var produto4 = {
  codigoProduto: "004",
  nomeProduto: "Teclado Mecânico Gamer RGB",
  precoDeVenda: 299,
  disponivel: true,
  quantidade: 12
};

var produto5 = {
  codigoProduto: "005",
  nomeProduto: "Mouse Óptico Sem Fio",
  precoDeVenda: 79.90,
  disponivel: true,
  quantidade: 20
};

var produtos = [produto1, produto2, produto3, produto4, produto5];

// listar os produtos cadastrados
function listaProdutosCadastrados(produtos) {
  var mensagem = "Produtos Cadastrados: \nCódigo | Item  | Preço | Disponibilidade | Quantidade\n";

  for (var i = 0; i < produtos.length; i++) {
    mensagem += produtos[i].codigoProduto + " - " 
             + produtos[i].nomeProduto + " - R$ " 
             + produtos[i].precoDeVenda.toFixed(2).replace('.', ',') + " - " 
             + (produtos[i].disponivel ? "Disponível" : "Indisponível") + " - " 
             + produtos[i].quantidade + "\n";
  }

  alert(mensagem);
}

// listar os produtos disponíveis
function produtosDisponiveis(produtos) {
  var mensagem = "Produtos Disponíveis: \nCódigo | Item  | Preço | Quantidade\n";

  for (var i = 0; i < produtos.length; i++) {
    if (produtos[i].disponivel) {
      mensagem += produtos[i].codigoProduto + " - " 
               + produtos[i].nomeProduto + " - R$ " 
               + produtos[i].precoDeVenda.toFixed(2).replace('.', ',') + " - " 
               + produtos[i].quantidade + "\n";
    }
  }

  alert(mensagem);
}

// lançar venda do produto
var listaDeLancamentos = [];

function registarItemVenda() {
  produtosDisponiveis(produtos);
  var produtoAdicionado = prompt("Digite o código do produto:");

  for (var i = 0; i < produtos.length; i++) {
    if (produtoAdicionado == produtos[i].codigoProduto) {
      var quantidadeProduto = parseInt(prompt("Digite a quantidade vendida do produto:"));
      if (quantidadeProduto > produtos[i].quantidade) {
        alert("Quantidade insuficiente do produto em estoque.");
      } else {
        produtos[i].quantidade -= quantidadeProduto; // Atualizar a quantidade do produto em estoque
        listaDeLancamentos.push({
          codigo: produtos[i].codigoProduto,
          nome: produtos[i].nomeProduto,
          preco: produtos[i].precoDeVenda,
          quantidade: quantidadeProduto
        });
        alert("Produto adicionado com sucesso!");
      }
      return; // depois de adicionar produto a lista de lançamentos para depois gerar a nota fiscal
    }
  }
  alert("Código do produto inválido.");
}

// imprimir a nota fiscal
function imprimeNotaFiscal() {
  var empresa = "Télos NF";
  var cnpj = "12.345.678/0001-90";
  var endereco = "Rua das Flores, 123";
  var cidade = "Rio de Janeiro";
  var data = new Date().toLocaleDateString();//data aualizada pelo sistema
  var numero = parseInt(Math.random() * (50 - 1) + 1); //número aleatório da nota fiscal 
  
  var mensagem = 
  `                 NOTA FISCAL                
  Empresa: ${empresa}
  CNPJ: ${cnpj}
  Endereço: ${endereco}
  Cidade: ${cidade}
  Data: ${data}
  Número: ${numero}

  ---------------------------------------------

  Qtd | Produto | Preço (R$)`;

  var total = 0;
  for(var i = 0; i < listaDeLancamentos.length; i++) {
    var item = listaDeLancamentos[i];
    mensagem += `\n  ${item.quantidade} | ${item.nome} | ${item.preco.toFixed(2).replace('.', ',')}`;
    total += item.preco * item.quantidade;
  }

  mensagem += 
  `
  ---------------------------------------------

  TOTAL: R$ ${total.toFixed(2).replace('.',',')}`;

  alert(mensagem);         
};

// iniciar nove venda
function iniciarNovaVenda() {
  listaDeLancamentos = []; // Limpa a lista de lançamentos para nova venda
  alert("Iniciar uma nova venda");
  registarItemVenda();
}

// Loop do menu inicial
while (true) {
  var opcao = prompt("Selecione a opção no menu correspondente ao número:\n 1 - Visualizar produtos cadastrados;\n 2 - Lançar venda de produto;\n 3 - Imprimir nota fiscal;\n 4 - Iniciar uma nova venda;\n 5 - Sair");

  switch (opcao) {
    case "1":
      listaProdutosCadastrados(produtos);
      break;
    case "2":
      registarItemVenda();
      break;
    case "3":
      imprimeNotaFiscal();
      break;
    case "4":
      iniciarNovaVenda();
      break;
    case "5":
      alert("Saindo do Sistema.");
      break;
    default:
      alert("Opção inválida.");
  }

  if (opcao === "5") {
    break;
  }
}
