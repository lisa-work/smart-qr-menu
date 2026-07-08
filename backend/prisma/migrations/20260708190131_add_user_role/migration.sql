-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Owner');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Role" "Role" NOT NULL DEFAULT 'User';
