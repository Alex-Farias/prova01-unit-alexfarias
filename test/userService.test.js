const UserService = require('../src/userService');

describe('UserService', () => {
  test('deve retornar nome do usuário quando encontrado', async () => {
    const userRepository = {
      findById: jest.fn().mockResolvedValue({ id: 1, name: 'João' }),
    };
    const service = new UserService(userRepository);

    const nome = await service.getUserName(1);

    expect(nome).toBe('João');
    expect(userRepository.findById).toHaveBeenCalledWith(1);
  });

  test('deve lançar erro quando usuário não existe', async () => {
    const userRepository = {
      findById: jest.fn().mockResolvedValue(null),
    };
    const service = new UserService(userRepository);

    await expect(service.getUserName(999)).rejects.toThrow('Usuário não encontrado');
  });

  test('deve retornar string vazia quando nome vier vazio no repositório', async () => {
    const userRepository = {
      findById: jest.fn().mockResolvedValue({ id: 2, name: '' }),
    };
    const service = new UserService(userRepository);

    const nome = await service.getUserName(2);

    expect(nome).toBe('');
  });

  test('deve propagar erro do repositório', async () => {
    const userRepository = {
      findById: jest.fn().mockRejectedValue(new Error('Falha no banco')),
    };
    const service = new UserService(userRepository);

    await expect(service.getUserName(10)).rejects.toThrow('Falha no banco');
  });

  test('deve consultar o repositório apenas uma vez por chamada', async () => {
    const userRepository = {
      findById: jest.fn().mockResolvedValue({ id: 3, name: 'Clara' }),
    };
    const service = new UserService(userRepository);

    await service.getUserName(3);

    expect(userRepository.findById).toHaveBeenCalledTimes(1);
  });
});
