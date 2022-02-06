import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import UserEntity from './user';

@Entity({ name: 'chat' })
class ChatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 500 })
  message: string;

  @Column('int')
  createdAt: number;

  @ManyToOne(() => UserEntity, user => user.uid, { nullable: false })
  user: UserEntity;
}

export default ChatEntity;
