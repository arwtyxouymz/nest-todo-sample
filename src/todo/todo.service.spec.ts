import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('TodoService', () => {
  let service: TodoService;
  let todos: Todo[];
  let repo: Repository<Todo>;

  beforeEach(async () => {
    todos = [{ id: 1, title: 'Sample Todo', description: '', isDone: false }];
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useValue: {
            find: jest.fn().mockImplementation(() => todos),
            findOne: jest
              .fn()
              .mockImplementation((id: number) =>
                todos.find((todo) => todo.id === id),
              ),
            create: jest.fn().mockImplementation(() => null),
            save: jest.fn().mockImplementation(() => null),
            update: jest.fn().mockImplementation(() => null),
            delete: jest.fn().mockImplementation(() => null),
          },
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    repo = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Not empty', async () => {
      const result = service.findAll();
      await expect(result).resolves.toBe(todos);
    });
  });

  describe('findOne', () => {
    it('should get a single cat', () => {
      const spyOn = jest.spyOn(repo, 'findOne');
      expect(service.get(1)).resolves.toEqual(todos[0]);
      expect(spyOn).toBeCalledWith(expect.any(Number));
    });
  });
});
