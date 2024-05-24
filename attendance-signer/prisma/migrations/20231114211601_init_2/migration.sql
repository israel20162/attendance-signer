/*
  Warnings:

  - You are about to drop the column `date` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `timeLimit` on the `Attendance` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attendance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "classId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "course_code" TEXT,
    "course_title" TEXT,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL
);
INSERT INTO "new_Attendance" ("classId", "code", "endTime", "id", "startTime") SELECT "classId", "code", "endTime", "id", "startTime" FROM "Attendance";
DROP TABLE "Attendance";
ALTER TABLE "new_Attendance" RENAME TO "Attendance";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
