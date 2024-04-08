-- DropForeignKey
ALTER TABLE "unpublished_product" DROP CONSTRAINT "unpublished_product_new_product_id_fkey";

-- AddForeignKey
ALTER TABLE "unpublished_product" ADD CONSTRAINT "unpublished_product_new_product_id_fkey" FOREIGN KEY ("new_product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
