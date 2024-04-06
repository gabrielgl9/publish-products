-- DropForeignKey
ALTER TABLE "unpublished_product" DROP CONSTRAINT "unpublished_product_published_product_id_fkey";

-- DropIndex
DROP INDEX "unpublished_product_operation_id_key";

-- DropIndex
DROP INDEX "unpublished_product_published_product_id_key";

-- AddForeignKey
ALTER TABLE "unpublished_product" ADD CONSTRAINT "unpublished_product_published_product_id_fkey" FOREIGN KEY ("published_product_id") REFERENCES "published_product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
