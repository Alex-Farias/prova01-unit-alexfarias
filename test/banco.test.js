const Banco = require('../src/banco');

describe('Banco', () => {
  test('deve depositar e atualizar saldo', () => {
    const conta = new Banco('Alex', 100);

    const saldo = conta.depositar(50);

    expect(saldo).toBe(150);
    expect(conta.obterHistorico()).toContainEqual({ tipo: 'Depósito', valor: 50 });
  });

  test('deve sacar quando houver saldo', () => {
    const conta = new Banco('Alex', 100);

    const saldo = conta.sacar(40);

    expect(saldo).toBe(60);
    expect(conta.obterHistorico()).toContainEqual({ tipo: 'Saque', valor: 40 });
  });

  test('deve lançar erro ao sacar sem saldo suficiente', () => {
    const conta = new Banco('Alex', 20);

    expect(() => conta.sacar(30)).toThrow('Saldo insuficiente');
  });

  test('deve transferir valor entre contas', () => {
    const origem = new Banco('Origem', 200);
    const destino = new Banco('Destino', 10);

    origem.transferir(50, destino);

    expect(origem.obterSaldo()).toBe(150);
    expect(destino.obterSaldo()).toBe(60);
    expect(origem.obterHistorico()).toContainEqual({
      tipo: 'Transferência',
      valor: 50,
      destino: 'Destino',
    });
  });

  test('deve definir e validar limite de saque', () => {
    const conta = new Banco('Alex', 500);
    conta.definirLimiteDeSaque(200);

    expect(conta.verificarLimiteDeSaque(150)).toBe(true);
    expect(() => conta.verificarLimiteDeSaque(250)).toThrow('Saque acima do limite permitido');
  });

  test('deve aplicar juros no saldo', () => {
    const conta = new Banco('Alex', 1000);

    const saldoComJuros = conta.aplicarJuros(10);

    expect(saldoComJuros).toBe(1100);
    expect(conta.obterHistorico()).toContainEqual({ tipo: 'Juros', valor: 100 });
  });

  test('deve pagar conta e registrar descrição', () => {
    const conta = new Banco('Alex', 300);

    const saldo = conta.pagarConta(120, 'Energia elétrica');

    expect(saldo).toBe(180);
    expect(conta.obterHistorico()).toContainEqual({
      tipo: 'Pagamento',
      valor: 120,
      descricao: 'Energia elétrica',
    });
  });

  test('deve retornar total depositado', () => {
    const conta = new Banco('Alex', 0);
    conta.depositar(100);
    conta.depositar(150);
    conta.sacar(50);

    expect(conta.obterTotalDepositado()).toBe(250);
  });

  test('deve retornar saldo inicial sem movimentações', () => {
    const conta = new Banco('Alex', 75);
    expect(conta.obterSaldo()).toBe(75);
  });

  test('deve lançar erro ao transferir valor maior que o saldo', () => {
    const origem = new Banco('Origem', 30);
    const destino = new Banco('Destino', 10);

    expect(() => origem.transferir(100, destino)).toThrow('Saldo insuficiente');
    expect(destino.obterSaldo()).toBe(10);
  });

  test('deve lançar erro ao pagar conta sem saldo suficiente', () => {
    const conta = new Banco('Alex', 40);
    expect(() => conta.pagarConta(100, 'Aluguel')).toThrow('Saldo insuficiente');
  });
});
