-- CreateTable
CREATE TABLE "operation" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "operation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unpublished_product" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "price" DOUBLE PRECISION,
    "published_product_id" INTEGER,
    "operation_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "unpublished_product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unpublished_product_published_product_id_key" ON "unpublished_product"("published_product_id");

-- CreateIndex
CREATE UNIQUE INDEX "unpublished_product_operation_id_key" ON "unpublished_product"("operation_id");

-- AddForeignKey
ALTER TABLE "unpublished_product" ADD CONSTRAINT "unpublished_product_published_product_id_fkey" FOREIGN KEY ("published_product_id") REFERENCES "published_product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unpublished_product" ADD CONSTRAINT "unpublished_product_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "operation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "unpublished_product" ALTER COLUMN "published_product_id" DROP NOT NULL;