-- DropForeignKey
ALTER TABLE "published_product" DROP CONSTRAINT "published_product_product_id_fkey";

-- AddForeignKey
ALTER TABLE "published_product" ADD CONSTRAINT "published_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
