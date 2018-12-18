import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  target: string;
  @Column({ type: "text" })
  payload: string;
  @Column({ type: "text" })
  key: string;
  @Column({ type: "boolean", default: false })
  used: boolean;
  @CreateDateColumn() createdAt: String;
  @UpdateDateColumn() updatedAt: String;
}

export default Verification;
