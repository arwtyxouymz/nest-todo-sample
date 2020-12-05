import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './models/todo.entity';

@Injectable()
export class TodoService {
  private readonly todos: Todo[] = [];

  findAll(): Todo[] {
    return this.todos;
  }

  get(id: number): Partial<Todo> {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo === undefined) {
      throw new NotFoundException('Specified Todo id not found!');
    }
    return todo;
  }

  create(createTodoDto: CreateTodoDto) {
    const id = (this.todos.map((todo) => todo.id).pop() || 0) + 1;
    const todo = new Todo(
      id,
      createTodoDto.title,
      createTodoDto.description,
      createTodoDto.until,
    );
    this.todos.push(todo);
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo === undefined) {
      throw new NotFoundException('Specified Todo id not found!');
    }
    Object.assign(todo, updateTodoDto);
  }

  delete(id: number) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === undefined) {
      throw new NotFoundException('Specified Todo id not found!');
    }
    this.todos.splice(index, 1);
  }
}
