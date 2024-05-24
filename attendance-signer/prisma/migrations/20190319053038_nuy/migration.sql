-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AttendanceSignature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'null',
    "attendanceId" INTEGER NOT NULL,
    "matricNumber" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "signTime" DATETIME NOT NULL,
    CONSTRAINT "AttendanceSignature_attendanceId_fkey" FOREIGN KEY ("attendanceId") REFERENCES "Attendance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AttendanceSignature" ("attendanceId", "id", "matricNumber", "signTime", "signature") SELECT "attendanceId", "id", "matricNumber", "signTime", "signature" FROM "AttendanceSignature";
DROP TABLE "AttendanceSignature";
ALTER TABLE "new_AttendanceSignature" RENAME TO "AttendanceSignature";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
