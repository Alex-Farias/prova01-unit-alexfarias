const ListaDeCompras = require('../src/lista');

describe('ListaDeCompras', () => {
  test('deve adicionar itens na lista', () => {
    const lista = new ListaDeCompras();
    lista.adicionarItem('arroz');
    lista.adicionarItem('feijão');

    expect(lista.obterItens()).toEqual(['arroz', 'feijão']);
  });

  test('deve remover item existente da lista', () => {
    const lista = new ListaDeCompras();
    lista.adicionarItem('leite');
    lista.removerItem('leite');

    expect(lista.obterItens()).toEqual([]);
  });

  test('deve lançar erro ao remover item inexistente', () => {
    const lista = new ListaDeCompras();

    expect(() => lista.removerItem('café')).toThrow('Item não encontrado na lista');
  });
});
