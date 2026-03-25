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

  test('deve retornar false para idade zero', () => {
    expect(obterCnh(0)).toBe(false);
  });

  test('deve retornar false para idade negativa', () => {
    expect(obterCnh(-1)).toBe(false);
  });

  test('deve retornar true para idade bem acima do limite', () => {
    expect(obterCnh(90)).toBe(true);
  });
});
