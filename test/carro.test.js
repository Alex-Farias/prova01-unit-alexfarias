const Carro = require('../src/carro');

describe('Carro', () => {
  test('deve iniciar com quilometragem zero', () => {
    const carro = new Carro('Ford', 'Ka', 2018);
    expect(carro.kilometragem).toBe(0);
  });

  test('deve somar quilometragem ao dirigir distância positiva', () => {
    const carro = new Carro('Ford', 'Ka', 2018);
    carro.dirigir(50);
    expect(carro.kilometragem).toBe(50);
  });

  test('não deve alterar quilometragem para distância não positiva', () => {
    const carro = new Carro('Ford', 'Ka', 2018);
    carro.dirigir(0);
    carro.dirigir(-10);
    expect(carro.kilometragem).toBe(0);
  });

  test('deve retornar informações formatadas do carro', () => {
    const carro = new Carro('Ford', 'Ka', 2018);
    carro.dirigir(120);
    expect(carro.obterInfo()).toBe('Ford Ka, Ano: 2018, Quilometragem: 120 km');
  });

  test('deve manter marca, modelo e ano definidos no construtor', () => {
    const carro = new Carro('Fiat', 'Uno', 2010);
    expect(carro.marca).toBe('Fiat');
    expect(carro.modelo).toBe('Uno');
    expect(carro.ano).toBe(2010);
  });

  test('deve acumular quilometragem em múltiplas chamadas', () => {
    const carro = new Carro('VW', 'Gol', 2020);
    carro.dirigir(10);
    carro.dirigir(15);
    expect(carro.kilometragem).toBe(25);
  });

  test('deve exibir 0 km no obterInfo sem dirigir', () => {
    const carro = new Carro('Honda', 'Fit', 2019);
    expect(carro.obterInfo()).toBe('Honda Fit, Ano: 2019, Quilometragem: 0 km');
  });
});
