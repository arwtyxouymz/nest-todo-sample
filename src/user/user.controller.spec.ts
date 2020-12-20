import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((dto: CreateUserDto) =>
                Promise.resolve({ ...dto }),
              ),
            findAll: jest.fn().mockResolvedValue([
              { id: 1, email: 'aaa@example.com', password: 'aaa' },
              { id: 2, email: 'bbb@example.com', password: 'bbb' },
              { id: 3, email: 'ccc@example.com', password: 'ccc' },
            ]),
            findOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                email: 'test@example.com',
                password: 'test password',
                id,
              }),
            ),
            update: jest
              .fn()
              .mockImplementation((id: number, dto: UpdateUserDto) =>
                Promise.resolve({ id, ...dto }),
              ),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a single user', () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        password: 'test password',
      };
      expect(controller.create(dto)).resolves.toEqual({
        ...dto,
      });
    });
  });

  describe('findAll', () => {
    it('should get a list of users', () => {
      expect(controller.findAll()).resolves.toEqual([
        { id: 1, email: 'aaa@example.com', password: 'aaa' },
        { id: 2, email: 'bbb@example.com', password: 'bbb' },
        { id: 3, email: 'ccc@example.com', password: 'ccc' },
      ]);
    });
  });

  describe('findOne', () => {
    it('should get a single user', () => {
      expect(controller.findOne('1')).resolves.toEqual({
        id: 1,
        email: 'test@example.com',
        password: 'test password',
      });
    });
  });
  describe('update', () => {
    it('should update a user', () => {
      const dto = {
        email: 'test@example.com',
        password: 'test password',
      };
      expect(controller.update('1', dto)).resolves.toEqual({
        id: 1,
        ...dto,
      });
    });
  });
  describe('remove', () => {
    it('should return { deleted: true }', () => {
      expect(controller.remove('1')).resolves.toStrictEqual({ deleted: true });
    });

    it('should return { deleted: false, message: err.message }', () => {
      const deleteSpy = jest
        .spyOn(service, 'remove')
        .mockResolvedValue({ deleted: false, message: 'Error test' });
      expect(controller.remove('1')).resolves.toStrictEqual({
        deleted: false,
        message: 'Error test',
      });
      expect(deleteSpy).toBeCalledTimes(1);
      expect(deleteSpy).toBeCalledWith(1);
    });
  });
});
