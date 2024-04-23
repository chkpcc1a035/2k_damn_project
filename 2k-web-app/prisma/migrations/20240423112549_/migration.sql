-- DropIndex
DROP INDEX "Customer_email_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "tag" TEXT,
    "features" TEXT,
    "price" REAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Product" ("createdAt", "description", "features", "id", "image", "name", "price", "quantity", "stock", "tag") SELECT "createdAt", "description", "features", "id", "image", "name", "price", "quantity", "stock", "tag" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
