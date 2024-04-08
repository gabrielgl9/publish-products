-- DropForeignKey
ALTER TABLE "unpublished_product" DROP CONSTRAINT "unpublished_product_deleted_product_id_fkey";

-- DropForeignKey
ALTER TABLE "unpublished_product" DROP CONSTRAINT "unpublished_product_new_product_id_fkey";

-- AddForeignKey
ALTER TABLE "unpublished_product" ADD CONSTRAINT "unpublished_product_new_product_id_fkey" FOREIGN KEY ("new_product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unpublished_product" ADD CONSTRAINT "unpublished_product_deleted_product_id_fkey" FOREIGN KEY ("deleted_product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
