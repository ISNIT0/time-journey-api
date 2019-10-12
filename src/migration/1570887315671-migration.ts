import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1570887315671 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "message_queue" ADD "sendAt" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "story_message" DROP COLUMN "absoluteDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "story_message" ADD "absoluteDate" TIMESTAMP`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "story_message" DROP COLUMN "absoluteDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "story_message" ADD "absoluteDate" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "message_queue" DROP COLUMN "sendAt"`, undefined);
    }

}
