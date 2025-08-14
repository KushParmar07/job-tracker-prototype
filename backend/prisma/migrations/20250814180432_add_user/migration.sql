/*
  Warnings:

  - Added the required column `Userid` to the `jobApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."jobApplication" ADD COLUMN     "Userid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."status" ADD COLUMN     "Userid" TEXT;

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."jobApplication" ADD CONSTRAINT "jobApplication_Userid_fkey" FOREIGN KEY ("Userid") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."status" ADD CONSTRAINT "status_Userid_fkey" FOREIGN KEY ("Userid") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
