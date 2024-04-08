/*
  Warnings:

  - You are about to drop the column `name` on the `published_product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `published_product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `unpublished_product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `unpublished_product` table. All the data in the column will be lost.
  - You are about to drop the column `published_product_id` on the `unpublished_product` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `published_product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "unpublished_product" DROP CONSTRAINT "unpublished_product_published_product_id_fkey";

-- AlterTable
ALTER TABLE "published_product" DROP COLUMN "name",
DROP COLUMN "price",
ADD COLUMN     "observation" TEXT,
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "unpublished_product" DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "published_product_id",
ADD COLUMN     "deleted_product_id" INTEGER,
ADD COLUMN     "new_product_id" INTEGER;

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "published_product" ADD CONSTRAINT "published_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unpublished_product" ADD CONSTRAINT "unpublished_product_new_product_id_fkey" FOREIGN KEY ("new_product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unpublished_product" ADD CONSTRAINT "unpublished_product_deleted_product_id_fkey" FOREIGN KEY ("deleted_product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
