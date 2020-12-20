import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                title: 'Test Todo',
                description: 'Test description',
                isDone: false,
              },
            ]),
            get: jest.fn().mockImplementation((id: number) => {
              return Promise.resolve({
                id,
                title: 'Test Todo',
                description: 'Test description',
                isDone: false,
              });
            }),
            create: jest
              .fn()
              .mockImplementation((createTodoDto: CreateTodoDto) => {
                return {
                  ...createTodoDto,
                };
              }),
            update: jest
              .fn()
              .mockImplementation(
                (id: number, updateTodoDto: UpdateTodoDto) => {
                  return {
                    id,
                    ...updateTodoDto,
                  };
                },
              ),
            delete: jest.fn().mockImplementation((id: number) => {}),
          },
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('test', async () => {
      expect(await controller.findAll()).toEqual([
        {
          title: 'Test Todo',
          description: 'Test description',
          isDone: false,
        },
      ]);
    });
  });
});
