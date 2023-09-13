import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateContactInfoTable1694508744707 implements MigrationInterface {
    name = 'CreateContactInfoTable1694508744707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact_info" ("id" SERIAL NOT NULL, "phone" character varying, "email" character varying NOT NULL, CONSTRAINT "PK_65b98fa4ffb26dceb9192f5d496" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contact_info"`);
    }

}
