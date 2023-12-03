-- CreateTable
CREATE TABLE "CollegeStyle" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "primaryColor" TEXT NOT NULL,
    "secundaryColor" TEXT NOT NULL,
    "thumb" TEXT NOT NULL,
    "CollegeId" INTEGER NOT NULL,

    CONSTRAINT "CollegeStyle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollegeStyle" ADD CONSTRAINT "CollegeStyle_CollegeId_fkey" FOREIGN KEY ("CollegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
