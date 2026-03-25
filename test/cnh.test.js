const { obterCnh } = require('../src/cnh');

describe('obterCnh', () => {
  test('deve retornar true para idade igual a 18', () => {
    expect(obterCnh(18)).toBe(true);
  });

  test('deve retornar true para maior de 18', () => {
    expect(obterCnh(30)).toBe(true);
  });

  test('deve retornar false para menor de 18', () => {
    expect(obterCnh(17)).toBe(false);
  });
});
