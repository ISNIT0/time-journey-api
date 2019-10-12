import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1570895144534 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "story" ADD "imageUrl" character varying NOT NULL DEFAULT 'missing.png'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "story" DROP COLUMN "imageUrl"`, undefined);
    }

}
