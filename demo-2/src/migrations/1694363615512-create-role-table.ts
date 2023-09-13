import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreateRoleTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "role",
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
        name: "roleId",
        type: "int",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "user",
      new TableForeignKey({
        columnNames: ["roleId"],
        referencedColumnNames: ["id"],
        referencedTableName: "role",
        onDelete: "SET NULL", // or 'CASCADE' if you want to delete users when a department is deleted
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("user", "roleId"); // Replace with your actual foreign key name
    await queryRunner.dropColumn("user", "roleId");
    await queryRunner.dropTable("role");
  }
}
