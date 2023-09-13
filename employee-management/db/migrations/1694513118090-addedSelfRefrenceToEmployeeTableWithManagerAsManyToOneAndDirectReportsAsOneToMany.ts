import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedSelfRefrenceToEmployeeTableWithManagerAsManyToOneAndDirectReportsAsOneToMany1694513118090 implements MigrationInterface {
    name = 'AddedSelfRefrenceToEmployeeTableWithManagerAsManyToOneAndDirectReportsAsOneToMany1694513118090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "managersId" integer`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_febaf7b4e12ada6a3cd81e5dbc2" FOREIGN KEY ("managersId") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_febaf7b4e12ada6a3cd81e5dbc2"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "managersId"`);
    }

}
