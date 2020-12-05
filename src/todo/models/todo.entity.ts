export class Todo {
  readonly id: number;
  title: string;
  description: string;
  isDone: boolean;
  until?: Date;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(id: number, title: string, description: string, until?: Date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isDone = false;
    this.until = until;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
