/*
  Warnings:

  - A unique constraint covering the columns `[install]` on the table `Template` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `install` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "install" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Template_install_key" ON "Template"("install");
