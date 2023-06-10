import { MigrationInterface, QueryRunner } from "typeorm";

export class $name1685763225772 implements MigrationInterface {
    name = '$name1685763225772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_product" DROP COLUMN "productId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_product" ADD "productId" character varying NOT NULL`);
    }

}
