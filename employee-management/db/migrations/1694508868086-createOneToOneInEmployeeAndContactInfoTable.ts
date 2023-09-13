import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOneToOneInEmployeeAndContactInfoTable1694508868086 implements MigrationInterface {
    name = 'CreateOneToOneInEmployeeAndContactInfoTable1694508868086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_info" ADD "employeeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact_info" ADD CONSTRAINT "UQ_f188a018423a2cc75535509ff97" UNIQUE ("employeeId")`);
        await queryRunner.query(`ALTER TABLE "contact_info" ADD CONSTRAINT "FK_f188a018423a2cc75535509ff97" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_info" DROP CONSTRAINT "FK_f188a018423a2cc75535509ff97"`);
        await queryRunner.query(`ALTER TABLE "contact_info" DROP CONSTRAINT "UQ_f188a018423a2cc75535509ff97"`);
        await queryRunner.query(`ALTER TABLE "contact_info" DROP COLUMN "employeeId"`);
    }

}
