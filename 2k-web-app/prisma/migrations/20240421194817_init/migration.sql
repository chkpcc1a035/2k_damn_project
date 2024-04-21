-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "tag" TEXT,
    "features" TEXT,
    "price" REAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "district" TEXT,
    "area" TEXT,
    "cardNumber" TEXT,
    "cardHolder" TEXT,
    "cardDate" TEXT,
    "cardCVC" TEXT
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" INTEGER,
    "orderTotal" REAL NOT NULL,
    "shippingCost" REAL NOT NULL,
    "discount" REAL NOT NULL,
    "subtotal" REAL NOT NULL,
    "taxes" REAL NOT NULL,
    "total" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER,
    "productId" TEXT,
    "quantity" INTEGER NOT NULL,
    "productPrice" REAL NOT NULL,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
