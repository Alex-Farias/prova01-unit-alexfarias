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
});
