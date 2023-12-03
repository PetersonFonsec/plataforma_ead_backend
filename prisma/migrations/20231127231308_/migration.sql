/*
  Warnings:

  - You are about to drop the column `CollegeId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `College` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_CollegeId_fkey";

-- AlterTable
ALTER TABLE "College" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "CollegeId";

-- AddForeignKey
ALTER TABLE "College" ADD CONSTRAINT "College_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
