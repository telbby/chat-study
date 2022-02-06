import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column('varchar', { length: 30, unique: true, nullable: true })
  userId: string;

  @Column('text', { nullable: true })
  password: string;

  @Column('varchar', { length: 5, default: 'GUEST' })
  permission: 'GUEST' | 'ADMIN';

  @Column('int', { nullable: true })
  loggedInAt: number;

  @Column('int', { nullable: true })
  createdAt: number;
}

export default UserEntity;
