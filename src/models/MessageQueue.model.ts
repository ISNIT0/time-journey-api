import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsPhoneNumber } from 'class-validator';

@Entity()
export class MessageQueue extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') public id: string;
    @CreateDateColumn() public createdAt: Date;
    @UpdateDateColumn() public updatedAt: Date;

    @Column() public body: string;
    @Column() public sendAt: Date;
    @Column() @IsPhoneNumber('44') public toPhone: string;
    @Column({ default: false }) public sent: boolean;
}
