const Utilitarios = require('../src/utilitarios');

describe('Utilitarios', () => {
  let util;

  beforeEach(() => {
    util = new Utilitarios();
  });

  test('inverterString deve inverter o texto', () => {
    expect(util.inverterString('abc')).toBe('cba');
  });

  test('contarCaracteres deve retornar a quantidade de caracteres', () => {
    expect(util.contarCaracteres('teste')).toBe(5);
  });

  test('paraMaiusculas deve converter para maiúsculas', () => {
    expect(util.paraMaiusculas('abc')).toBe('ABC');
  });

  test('paraMinusculas deve converter para minúsculas', () => {
    expect(util.paraMinusculas('ABC')).toBe('abc');
  });

  test('primeiraLetraMaiuscula deve capitalizar primeira letra', () => {
    expect(util.primeiraLetraMaiuscula('alex')).toBe('Alex');
  });

  test('operações matemáticas devem funcionar', () => {
    expect(util.somar(2, 3)).toBe(5);
    expect(util.subtrair(5, 3)).toBe(2);
    expect(util.multiplicar(4, 3)).toBe(12);
    expect(util.dividir(10, 2)).toBe(5);
    expect(() => util.dividir(10, 0)).toThrow('Divisão por zero');
  });

  test('ehPar deve identificar números pares', () => {
    expect(util.ehPar(4)).toBe(true);
    expect(util.ehPar(5)).toBe(false);
  });

  test('métodos de array devem retornar elementos corretos', () => {
    expect(util.primeiroElemento([1, 2, 3])).toBe(1);
    expect(util.ultimoElemento([1, 2, 3])).toBe(3);
    expect(util.tamanhoArray([1, 2, 3])).toBe(3);
    expect(util.ordenarArray([3, 1, 2])).toEqual([1, 2, 3]);
    expect(util.inverterArray([1, 2, 3])).toEqual([3, 2, 1]);
  });

  test('gerarNumeroAleatorio deve respeitar intervalo', () => {
    const n = util.gerarNumeroAleatorio(10);
    expect(n).toBeGreaterThanOrEqual(0);
    expect(n).toBeLessThan(10);
  });

  test('ehNumero deve validar números corretamente', () => {
    expect(util.ehNumero(10)).toBe(true);
    expect(util.ehNumero(NaN)).toBe(false);
    expect(util.ehNumero('10')).toBe(false);
  });

  test('métodos de texto adicionais devem funcionar', () => {
    expect(util.removerEspacos('  texto  ')).toBe('texto');
    expect(util.repetirTexto('a', 3)).toBe('aaa');
    expect(util.juntarArray(['a', 'b'], '-')).toBe('a-b');
    expect(util.contarPalavras('um dois   tres')).toBe(3);
  });

  test('mediaArray deve calcular média e tratar vazio', () => {
    expect(util.mediaArray([2, 4, 6])).toBe(4);
    expect(util.mediaArray([])).toBe(0);
  });

  test('removerDuplicados deve eliminar valores repetidos', () => {
    expect(util.removerDuplicados([1, 1, 2, 3, 3])).toEqual([1, 2, 3]);
  });

  test('ehPalindromo deve validar palíndromos', () => {
    expect(util.ehPalindromo('Socorram me subi no onibus em Marrocos')).toBe(true);
    expect(util.ehPalindromo('javascript')).toBe(false);
  });

  test('mesclarObjetos deve combinar e sobrescrever propriedades', () => {
    expect(util.mesclarObjetos({ a: 1, b: 2 }, { b: 3, c: 4 })).toEqual({ a: 1, b: 3, c: 4 });
  });

  test('juntarArray deve usar vírgula como separador padrão', () => {
    expect(util.juntarArray(['x', 'y', 'z'])).toBe('x,y,z');
  });

  test('ordenarArray não deve mutar o array original', () => {
    const original = [3, 1, 2];
    const ordenado = util.ordenarArray(original);

    expect(original).toEqual([3, 1, 2]);
    expect(ordenado).toEqual([1, 2, 3]);
  });

  test('primeiraLetraMaiuscula deve retornar vazio para string vazia', () => {
    expect(util.primeiraLetraMaiuscula('')).toBe('');
  });
});
