/*
  Warnings:

  - You are about to drop the column `finish` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `studentID` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Calendar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Progress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_studentID_fkey";

-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_studentID_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "finish",
DROP COLUMN "studentID",
ADD COLUMN     "courseId" INTEGER;

-- DropTable
DROP TABLE "Calendar";

-- DropTable
DROP TABLE "Progress";

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "collegeID" INTEGER NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_collegeID_fkey" FOREIGN KEY ("collegeID") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
