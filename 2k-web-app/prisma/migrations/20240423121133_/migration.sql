-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "district" TEXT,
    "area" TEXT,
    "cardNumber" TEXT,
    "cardHolder" TEXT,
    "cardDate" TEXT,
    "cardCVC" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Customer_username_fkey" FOREIGN KEY ("username") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Customer" ("address", "area", "cardCVC", "cardDate", "cardHolder", "cardNumber", "district", "email", "id", "name", "phone", "username") SELECT "address", "area", "cardCVC", "cardDate", "cardHolder", "cardNumber", "district", "email", "id", "name", "phone", "username" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_username_key" ON "Customer"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
