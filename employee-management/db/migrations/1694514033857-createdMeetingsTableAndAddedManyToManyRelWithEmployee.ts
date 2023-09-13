import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedMeetingsTableAndAddedManyToManyRelWithEmployee1694514033857 implements MigrationInterface {
    name = 'CreatedMeetingsTableAndAddedManyToManyRelWithEmployee1694514033857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meeting" ("id" SERIAL NOT NULL, "zoomUrl" character varying NOT NULL, CONSTRAINT "PK_dccaf9e4c0e39067d82ccc7bb83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_meetings_meeting" ("employeeId" integer NOT NULL, "meetingId" integer NOT NULL, CONSTRAINT "PK_42c91b964b9c480aadec311fafb" PRIMARY KEY ("employeeId", "meetingId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0f0c3a58474a40670f633832aa" ON "employee_meetings_meeting" ("employeeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_10f26ded70438524748ef34cd1" ON "employee_meetings_meeting" ("meetingId") `);
        await queryRunner.query(`ALTER TABLE "employee_meetings_meeting" ADD CONSTRAINT "FK_0f0c3a58474a40670f633832aa8" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee_meetings_meeting" ADD CONSTRAINT "FK_10f26ded70438524748ef34cd10" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_meetings_meeting" DROP CONSTRAINT "FK_10f26ded70438524748ef34cd10"`);
        await queryRunner.query(`ALTER TABLE "employee_meetings_meeting" DROP CONSTRAINT "FK_0f0c3a58474a40670f633832aa8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_10f26ded70438524748ef34cd1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0f0c3a58474a40670f633832aa"`);
        await queryRunner.query(`DROP TABLE "employee_meetings_meeting"`);
        await queryRunner.query(`DROP TABLE "meeting"`);
    }

}
