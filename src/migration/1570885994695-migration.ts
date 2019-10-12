import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1570885994695 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "message_queue" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "body" character varying NOT NULL, "toPhone" character varying NOT NULL, "sent" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_948a560dc247eabb847829e9549" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "story_message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "body" character varying NOT NULL, "absoluteDate" character varying, "relativeDate" character varying, "storyId" uuid, CONSTRAINT "PK_d8e123e66f00394d8e7249f1fca" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "story" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_28fce6873d61e2cace70a0f3361" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "story_message" ADD CONSTRAINT "FK_66579f02dad360c2b55f998e348" FOREIGN KEY ("storyId") REFERENCES "story"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "story_message" DROP CONSTRAINT "FK_66579f02dad360c2b55f998e348"`, undefined);
        await queryRunner.query(`DROP TABLE "story"`, undefined);
        await queryRunner.query(`DROP TABLE "story_message"`, undefined);
        await queryRunner.query(`DROP TABLE "message_queue"`, undefined);
    }

}
