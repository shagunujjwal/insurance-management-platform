/*
  Warnings:

  - Made the column `address` on table `Agent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Agent" ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "commission" DROP DEFAULT;
