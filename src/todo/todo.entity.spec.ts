import { Todo } from './todo.entity';

describe('Todo class', () => {
  it('should make a todo with no fields', () => {
    const todo = new Todo();
    expect(todo).toBeTruthy();
    expect(todo.title).toBeUndefined();
    expect(todo.description).toBeUndefined();
    expect(todo.until).toBeUndefined();
    expect(todo.isDone).toBeUndefined();
  });
});
