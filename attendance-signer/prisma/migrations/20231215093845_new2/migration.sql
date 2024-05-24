-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attendance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "classId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "course_code" TEXT,
    "course_title" TEXT,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "repId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Attendance_repId_fkey" FOREIGN KEY ("repId") REFERENCES "Rep" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Attendance" ("classId", "code", "course_code", "course_title", "endTime", "id", "startTime") SELECT "classId", "code", "course_code", "course_title", "endTime", "id", "startTime" FROM "Attendance";
DROP TABLE "Attendance";
ALTER TABLE "new_Attendance" RENAME TO "Attendance";
CREATE UNIQUE INDEX "Attendance_code_key" ON "Attendance"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
