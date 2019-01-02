import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('Users')
@Unique(['email'])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50, nullable: true })
  firstName: string | null;

  @Column('varchar', { length: 50, nullable: true })
  lastName: string | null;

  @Column('varchar', { length: 50, nullable: true })
  email: string | null;

  @Column('text', { nullable: true })
  password: string | null;

  @Column('text', { nullable: true })
  twitterId: string | null;

  @Column('text', { nullable: true })
  facebookId: string | null;

  @Column('text', { nullable: true })
  googleId: string | null;

  @Column('varchar', { length: 50, nullable: true })
  phone: string | null;

  @Column('integer', { default: 0 })
  confirmedEmail: number;

  @Column('integer', { default: 0 })
  admin: number;

  @Column('integer', { default: 0 })
  forgotPasswordLocked: number;

  @BeforeInsert()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await bcrypt.hash(this.password, 10);
  }
}
