import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasksTableAndAssignManyToOneRelWithEmployee1694509841916 implements MigrationInterface {
    name = 'CreateTasksTableAndAssignManyToOneRelWithEmployee1694509841916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "employeeId" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_07278e1532a8daa462123fb7bc1" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_07278e1532a8daa462123fb7bc1"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
