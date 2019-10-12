import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { StoryMessage } from './StoryMessage.model';

@Entity()
export class Story extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') public id: string;
    @CreateDateColumn() public createdAt: Date;
    @UpdateDateColumn() public updatedAt: Date;

    @Column() public title: string;
    @Column() public description: string;
    @OneToMany((type) => StoryMessage, (sm) => sm.story) public messages: StoryMessage[];
}
