/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Attendance_code_key" ON "Attendance"("code");
