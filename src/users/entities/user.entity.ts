import { Exclude } from 'class-transformer';

export class User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}
