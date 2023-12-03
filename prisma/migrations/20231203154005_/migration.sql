/*
  Warnings:

  - You are about to drop the column `primaryColor` on the `College` table. All the data in the column will be lost.
  - You are about to drop the column `secundaryColor` on the `College` table. All the data in the column will be lost.
  - You are about to drop the column `thumb` on the `College` table. All the data in the column will be lost.
  - You are about to drop the column `CollegeId` on the `CollegeStyle` table. All the data in the column will be lost.
  - You are about to drop the column `CollegeId` on the `Course` table. All the data in the column will be lost.
  - Added the required column `collegeId` to the `CollegeStyle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collegeId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CollegeStyle" DROP CONSTRAINT "CollegeStyle_CollegeId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_CollegeId_fkey";

-- AlterTable
ALTER TABLE "College" DROP COLUMN "primaryColor",
DROP COLUMN "secundaryColor",
DROP COLUMN "thumb";

-- AlterTable
ALTER TABLE "CollegeStyle" DROP COLUMN "CollegeId",
ADD COLUMN     "collegeId" INTEGER NOT NULL,
ALTER COLUMN "primaryColor" SET DEFAULT '',
ALTER COLUMN "secundaryColor" SET DEFAULT '',
ALTER COLUMN "thumb" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "CollegeId",
ADD COLUMN     "collegeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CollegeStyle" ADD CONSTRAINT "CollegeStyle_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
