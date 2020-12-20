import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async get(id: number) {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException('Specified todo was not found!');
    }
    return todo;
  }

  async create(createTodoDto: CreateTodoDto) {
    const todo = this.todoRepository.create({ ...createTodoDto });
    await this.todoRepository.save(todo);
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    let todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException('Specified todo was not found');
    }
    await this.todoRepository.update({ id }, updateTodoDto);
    todo = await this.todoRepository.findOne(id);
    return todo;
  }

  async delete(id: number) {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) throw new NotFoundException('Specified todo was not found');
    await this.todoRepository.delete(id);
    return todo;
  }
}
