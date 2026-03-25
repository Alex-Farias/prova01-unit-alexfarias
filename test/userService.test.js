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
});
