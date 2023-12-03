-- AlterTable
ALTER TABLE "College" ADD COLUMN     "primaryColor" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "secundaryColor" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "thumb" SET DEFAULT '';
