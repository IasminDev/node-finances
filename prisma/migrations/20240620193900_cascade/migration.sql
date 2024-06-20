-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_debts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "debts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_debts" ("amount", "date", "description", "id", "status", "user_id") SELECT "amount", "date", "description", "id", "status", "user_id" FROM "debts";
DROP TABLE "debts";
ALTER TABLE "new_debts" RENAME TO "debts";
CREATE TABLE "new_goals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "goals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_goals" ("date", "description", "id", "user_id", "value") SELECT "date", "description", "id", "user_id", "value" FROM "goals";
DROP TABLE "goals";
ALTER TABLE "new_goals" RENAME TO "goals";
CREATE TABLE "new_savings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "savings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_savings" ("amount", "date", "description", "id", "status", "user_id") SELECT "amount", "date", "description", "id", "status", "user_id" FROM "savings";
DROP TABLE "savings";
ALTER TABLE "new_savings" RENAME TO "savings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
