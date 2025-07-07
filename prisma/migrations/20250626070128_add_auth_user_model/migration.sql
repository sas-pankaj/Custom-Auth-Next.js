-- CreateTable
CREATE TABLE "AuthUsers" (
    "Id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "AuthUsers_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthUsers_email_key" ON "AuthUsers"("email");
