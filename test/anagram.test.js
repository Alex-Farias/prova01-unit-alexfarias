const { isAnagram } = require('../src/anagram');

describe('isAnagram', () => {
  test('deve retornar true para anagramas simples', () => {
    expect(isAnagram('amor', 'roma')).toBe(true);
  });

  test('deve ignorar espaços e pontuação', () => {
    expect(isAnagram('Dormitory!!!', 'dirty room')).toBe(true);
  });

  test('deve retornar false para palavras que não são anagramas', () => {
    expect(isAnagram('casa', 'caso')).toBe(false);
  });

  test('deve ser case insensitive', () => {
    expect(isAnagram('Listen', 'Silent')).toBe(true);
  });

  test('deve considerar números na comparação', () => {
    expect(isAnagram('a1b2', '2b1a')).toBe(true);
  });

  test('deve retornar false para tamanhos diferentes', () => {
    expect(isAnagram('roma', 'romas')).toBe(false);
  });
});
