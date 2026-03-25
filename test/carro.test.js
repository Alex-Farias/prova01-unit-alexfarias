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
});
