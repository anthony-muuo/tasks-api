-- CreateTable
CREATE TABLE "tasks_table" (
    "id" SERIAL NOT NULL,
    "tasks_title" TEXT NOT NULL,
    "tasks_description" TEXT NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "task_isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tasks_table_pkey" PRIMARY KEY ("id")
);
