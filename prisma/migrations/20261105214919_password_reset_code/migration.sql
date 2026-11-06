-- AlterTable
ALTER TABLE "PersonalInformation" ALTER COLUMN "birth_date" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password_reset_code" TEXT;
