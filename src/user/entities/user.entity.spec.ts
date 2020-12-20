import { User } from './user.entity';

describe('User Entity', () => {
  it('With email and password', () => {
    const user = new User('aaaaa@example.com', 'password');
    expect(user.id).toBeUndefined();
    expect(user.email).toBe('aaaaa@example.com');
    expect(user.password).toBe('password');
    expect(user.createdAt).toBeUndefined();
    expect(user.updatedAt).toBeUndefined();
    expect(user.todos).toStrictEqual([]);
  });
});
