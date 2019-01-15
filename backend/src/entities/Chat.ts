import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Column
} from "typeorm";

import Message from "./Message";
import User from "./User";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @OneToMany(type => Message, message => message.chat)
  messages: Message[];

  @Column({ nullable: true })
  passengerId: number;

  @Column({ nullable: true })
  driverId: number;

  @ManyToOne(type => User, user => user.chatAsPassenger)
  passenger: User;

  @ManyToOne(type => User, user => user.chatAsDriver)
  driver: User;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}

export default Chat;
