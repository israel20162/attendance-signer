-- CreateTable
CREATE TABLE "Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matricNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "classId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "timeLimit" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AttendanceSignature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "attendanceId" INTEGER NOT NULL,
    "matricNumber" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "signTime" DATETIME NOT NULL,
    CONSTRAINT "AttendanceSignature_attendanceId_fkey" FOREIGN KEY ("attendanceId") REFERENCES "Attendance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AttendanceToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AttendanceToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Attendance" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AttendanceToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_matricNumber_key" ON "Student"("matricNumber");

-- CreateIndex
CREATE UNIQUE INDEX "_AttendanceToStudent_AB_unique" ON "_AttendanceToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_AttendanceToStudent_B_index" ON "_AttendanceToStudent"("B");
