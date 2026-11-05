/*
  Warnings:

  - You are about to alter the column `salary_min` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.
  - You are about to alter the column `salary_max` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.

*/
-- AlterTable
ALTER TABLE "InterviewQuestion" ALTER COLUMN "question" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "salary_min" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "salary_max" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "PersonalInformation" ALTER COLUMN "birth_date" DROP DEFAULT,
ALTER COLUMN "birth_state" DROP NOT NULL,
ALTER COLUMN "birth_country" DROP NOT NULL;
