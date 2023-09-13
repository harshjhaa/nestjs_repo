import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreateDepartmentTable1694176890296 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "department",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
          },
        ],
      }),
      true
    );

    // Add a foreign key to the User table
    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "departmentId",
        type: "int",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "user",
      new TableForeignKey({
        columnNames: ["departmentId"],
        referencedColumnNames: ["id"],
        referencedTableName: "department",
        onDelete: "SET NULL", // or 'CASCADE' if you want to delete users when a department is deleted
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("user", "FK_xxxxxxxxxx"); // Replace with your actual foreign key name
    await queryRunner.dropColumn("user", "departmentId");
    await queryRunner.dropTable("department");
  }
}
