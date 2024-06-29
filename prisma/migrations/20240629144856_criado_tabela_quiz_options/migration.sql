/*
  Warnings:

  - Added the required column `describe` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "describe" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "QuizOptions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "correctOptions" BOOLEAN NOT NULL DEFAULT false,
    "quizId" INTEGER,

    CONSTRAINT "QuizOptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuizOptions" ADD CONSTRAINT "QuizOptions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE SET NULL ON UPDATE CASCADE;
