/*
  Warnings:

  - Added the required column `username` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "district" TEXT,
    "area" TEXT,
    "cardNumber" TEXT,
    "cardHolder" TEXT,
    "cardDate" TEXT,
    "cardCVC" TEXT,
    CONSTRAINT "Customer_username_fkey" FOREIGN KEY ("username") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Customer" ("address", "area", "cardCVC", "cardDate", "cardHolder", "cardNumber", "district", "email", "id", "name", "phone") SELECT "address", "area", "cardCVC", "cardDate", "cardHolder", "cardNumber", "district", "email", "id", "name", "phone" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_username_key" ON "Customer"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
