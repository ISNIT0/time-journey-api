import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Story } from './Story.model';

@Entity()
export class StoryMessage extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') public id: string;
    @CreateDateColumn() public createdAt: Date;
    @UpdateDateColumn() public updatedAt: Date;

    @Column() public body: string;
    @Column({ nullable: true }) public absoluteDate: Date;
    @Column({ nullable: true }) public relativeDate: string;
    @ManyToOne((type) => Story, (s) => s.messages) public story: Story;
}
