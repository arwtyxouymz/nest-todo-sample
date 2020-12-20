import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Todo } from '../../todo/todo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @OneToMany((type) => Todo, (todo) => todo.user)
  todos: Todo[] = [];

  constructor(email?: string, password?: string) {
    this.email = email;
    this.password = password;
  }
}
