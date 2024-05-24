-- CreateTable
CREATE TABLE "Rep" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matricNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "is_course_rep" BOOLEAN,
    "password" TEXT NOT NULL DEFAULT '1234'
);

-- CreateIndex
CREATE UNIQUE INDEX "Rep_matricNumber_key" ON "Rep"("matricNumber");
