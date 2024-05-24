/*
  Warnings:

  - You are about to drop the column `matricNumber` on the `Student` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "is_course_rep" BOOLEAN,
    "password" TEXT NOT NULL DEFAULT '1234'
);
INSERT INTO "new_Student" ("department", "id", "is_course_rep", "name", "password") SELECT "department", "id", "is_course_rep", "name", "password" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
