/*
  Warnings:

  - You are about to drop the column `collegeID` on the `Quiz` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_collegeID_fkey";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "collegeID",
ADD COLUMN     "courseId" INTEGER;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
