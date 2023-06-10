import { MigrationInterface, QueryRunner } from "typeorm";

export class $name1685846167752 implements MigrationInterface {
    name = '$name1685846167752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart_product" ("id" BIGSERIAL NOT NULL, "title" character varying NOT NULL, "quality" integer NOT NULL, "price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "productIdId" bigint, CONSTRAINT "UQ_8c8965b51baae84e06a70ae02df" UNIQUE ("title"), CONSTRAINT "PK_dccd1ec2d6f5644a69adf163bc1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD CONSTRAINT "FK_b6e78d1d77f5801d5a7e2a52e80" FOREIGN KEY ("productIdId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_product" DROP CONSTRAINT "FK_b6e78d1d77f5801d5a7e2a52e80"`);
        await queryRunner.query(`DROP TABLE "cart_product"`);
    }

}
