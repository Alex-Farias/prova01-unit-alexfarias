const ContaBancaria = require('../src/contaBancaria');

describe('ContaBancaria', () => {
	let conta;
	let dadosConta;

	beforeEach(() => {
		dadosConta = {
			id: '001',
			titular: 'Alex',
			saldo: 100,
			limite: 50,
			status: 'ativa',
			atualizadaEm: null,
		};

		conta = new ContaBancaria(dadosConta);
	});

	test('deve retornar dados básicos da conta', () => {
		expect(conta.obterSaldo()).toBe(100);
		expect(conta.obterTitular()).toBe('Alex');
		expect(conta.obterStatus()).toBe('ativa');
		expect(conta.obterLimite()).toBe(50);
		expect(conta.estaAtiva()).toBe(true);
	});

	test('deve depositar valor válido e atualizar data', () => {
		const sucesso = conta.depositar(40);

		expect(sucesso).toBe(true);
		expect(conta.obterSaldo()).toBe(140);
		expect(dadosConta.atualizadaEm).toBeInstanceOf(Date);
	});

	test('não deve depositar valor inválido', () => {
		expect(conta.depositar(0)).toBe(false);
		expect(conta.depositar(-10)).toBe(false);
		expect(conta.obterSaldo()).toBe(100);
	});

	test('deve sacar quando houver saldo disponível (saldo + limite)', () => {
		const sucesso = conta.sacar(120);

		expect(sucesso).toBe(true);
		expect(conta.obterSaldo()).toBe(-20);
		expect(dadosConta.atualizadaEm).toBeInstanceOf(Date);
	});

	test('não deve sacar quando valor for inválido ou exceder disponível', () => {
		expect(conta.sacar(0)).toBe(false);
		expect(conta.sacar(-5)).toBe(false);
		expect(conta.sacar(200)).toBe(false);
		expect(conta.obterSaldo()).toBe(100);
	});

	test('deve alterar titular com valor válido', () => {
		expect(conta.alterarTitular('Maria')).toBe(true);
		expect(conta.obterTitular()).toBe('Maria');
	});

	test('não deve alterar titular vazio', () => {
		expect(conta.alterarTitular('')).toBe(false);
		expect(conta.alterarTitular(null)).toBe(false);
		expect(conta.obterTitular()).toBe('Alex');
	});

	test('deve bloquear e ativar conta conforme status atual', () => {
		expect(conta.bloquearConta()).toBe(true);
		expect(conta.obterStatus()).toBe('bloqueada');
		expect(conta.bloquearConta()).toBe(false);

		expect(conta.ativarConta()).toBe(true);
		expect(conta.obterStatus()).toBe('ativa');
		expect(conta.ativarConta()).toBe(false);
	});

	test('deve encerrar conta somente quando saldo for zero', () => {
		expect(conta.encerrarConta()).toBe(false);

		conta.conta.saldo = 0;
		expect(conta.encerrarConta()).toBe(true);
		expect(conta.obterStatus()).toBe('encerrada');
	});

	test('deve validar possibilidade de saque', () => {
		expect(conta.podeSacar(1)).toBe(true);
		expect(conta.podeSacar(150)).toBe(true);
		expect(conta.podeSacar(151)).toBe(false);
		expect(conta.podeSacar(0)).toBe(false);
	});

	test('deve aplicar tarifa válida e ajustar limite corretamente', () => {
		expect(conta.aplicarTarifa(10)).toBe(true);
		expect(conta.obterSaldo()).toBe(90);

		expect(conta.ajustarLimite(80)).toBe(true);
		expect(conta.obterLimite()).toBe(80);

		expect(conta.aplicarTarifa(0)).toBe(false);
		expect(conta.ajustarLimite(-1)).toBe(false);
	});

	test('deve identificar saldo negativo', () => {
		expect(conta.saldoNegativo()).toBe(false);
		conta.conta.saldo = -1;
		expect(conta.saldoNegativo()).toBe(true);
	});

	test('deve transferir para conta destino quando saque for possível', () => {
		const destino = { depositar: jest.fn() };

		const sucesso = conta.transferir(50, destino);

		expect(sucesso).toBe(true);
		expect(conta.obterSaldo()).toBe(50);
		expect(destino.depositar).toHaveBeenCalledWith(50);
	});

	test('não deve transferir quando saque não for possível', () => {
		const destino = { depositar: jest.fn() };

		const sucesso = conta.transferir(500, destino);

		expect(sucesso).toBe(false);
		expect(destino.depositar).not.toHaveBeenCalled();
	});

	test('não deve transferir quando saque falhar após validação', () => {
		const destino = { depositar: jest.fn() };
		jest.spyOn(conta, 'podeSacar').mockReturnValue(true);
		jest.spyOn(conta, 'sacar').mockReturnValue(false);

		const sucesso = conta.transferir(50, destino);

		expect(sucesso).toBe(false);
		expect(destino.depositar).not.toHaveBeenCalled();
	});

	test('deve calcular saldo disponível e gerar resumo', () => {
		expect(conta.calcularSaldoDisponivel()).toBe(150);

		expect(conta.gerarResumo()).toEqual({
			titular: 'Alex',
			saldo: 100,
			limite: 50,
			disponivel: 150,
			status: 'ativa',
		});
	});

	test('deve validar dados da conta corretamente', () => {
		expect(conta.validarConta()).toBe(true);

		conta.conta.id = '';
		expect(conta.validarConta()).toBe(false);

		conta.conta.id = '001';
		conta.conta.status = 'inativa';
		expect(conta.validarConta()).toBe(false);
	});

	test('deve invalidar conta com titular vazio, saldo não numérico e limite negativo', () => {
		conta.conta.titular = '';
		expect(conta.validarConta()).toBe(false);

		conta.conta.titular = 'Alex';
		conta.conta.saldo = '100';
		expect(conta.validarConta()).toBe(false);

		conta.conta.saldo = 100;
		conta.conta.limite = -1;
		expect(conta.validarConta()).toBe(false);
	});

	test('deve resetar conta para estado padrão', () => {
		conta.conta.saldo = 500;
		conta.conta.limite = 300;
		conta.conta.status = 'bloqueada';

		conta.resetarConta();

		expect(conta.obterSaldo()).toBe(0);
		expect(conta.obterLimite()).toBe(0);
		expect(conta.obterStatus()).toBe('ativa');
		expect(dadosConta.atualizadaEm).toBeInstanceOf(Date);
	});
});
