import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let users: User[];
  let repository: Repository<User>;
  const testUser = new User('test@example.com', 'test password');

  beforeEach(async () => {
    users = [
      new User('aaaaa@example.com', 'password1'),
      new User('bbbbb@example.com', 'password2'),
      new User('ccccc@example.com', 'password3'),
    ];
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockReturnValue(testUser),
            save: jest.fn().mockImplementation(async (user: User) => {
              users.push(user);
            }),
            find: jest.fn().mockResolvedValue(users),
            findOneOrFail: jest.fn().mockResolvedValue(testUser),
            update: jest.fn(),
            delete: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      expect(service.findAll()).resolves.toBe(users);
    });
  });

  describe('findOne', () => {
    it('should get a single user', () => {
      const repoSpy = jest.spyOn(repository, 'findOneOrFail');
      expect(service.findOne(1)).resolves.toEqual(testUser);
      expect(repoSpy.mock.calls[0][0]).toBe(1);
    });
  });

  describe('create', () => {
    it('should successfully create a user', () => {
      expect(
        service.create({
          email: 'test@example.com',
          password: 'test password',
        }),
      ).resolves.toEqual(testUser);
      expect(repository.create).toBeCalledTimes(1);
      expect(repository.create).toBeCalledWith({
        email: 'test@example.com',
        password: 'test password',
      });
      expect(repository.save).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should call the update method', async () => {
      const user = await service.update(1, {
        email: 'test@example.com',
        password: 'test password',
      });
      expect(user).toEqual(testUser);
      expect(repository.update).toBeCalledTimes(1);
      expect(repository.update).toBeCalledWith(
        { id: 1 },
        {
          email: 'test@example.com',
          password: 'test password',
        },
      );
    });
  });

  describe('delete', () => {
    it('should return { deleted: true }', () => {
      expect(service.remove(1)).resolves.toStrictEqual({ deleted: true });
    });
    it('should return { deleted: false, message: err.message }', () => {
      const repoSpy = jest
        .spyOn(repository, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.remove(1)).resolves.toStrictEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
      expect(repoSpy).toBeCalledWith({ id: 1 });
      expect(repoSpy).toBeCalledTimes(1);
    });
  });
});
