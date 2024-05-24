-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matricNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "is_course_rep" BOOLEAN,
    "password" TEXT NOT NULL DEFAULT '1234'
);
INSERT INTO "new_Student" ("department", "id", "is_course_rep", "matricNumber", "name", "password") SELECT "department", "id", "is_course_rep", "matricNumber", "name", coalesce("password", '1234') AS "password" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_matricNumber_key" ON "Student"("matricNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
