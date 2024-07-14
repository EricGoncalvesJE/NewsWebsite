/*
  Warnings:

  - You are about to drop the column `articleId` on the `NoteImage` table. All the data in the column will be lost.
  - You are about to drop the column `noteId` on the `ArticleImage` table. All the data in the column will be lost.
  - Added the required column `noteId` to the `NoteImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `articleId` to the `ArticleImage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NoteImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "altText" TEXT,
    "contentType" TEXT NOT NULL,
    "blob" BLOB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "noteId" TEXT NOT NULL,
    CONSTRAINT "NoteImage_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_NoteImage" ("altText", "blob", "contentType", "createdAt", "id", "updatedAt") SELECT "altText", "blob", "contentType", "createdAt", "id", "updatedAt" FROM "NoteImage";
DROP TABLE "NoteImage";
ALTER TABLE "new_NoteImage" RENAME TO "NoteImage";
CREATE INDEX "NoteImage_noteId_idx" ON "NoteImage"("noteId");
CREATE TABLE "new_ArticleImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "altText" TEXT,
    "contentType" TEXT NOT NULL,
    "blob" BLOB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "articleId" TEXT NOT NULL,
    CONSTRAINT "ArticleImage_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ArticleImage" ("altText", "blob", "contentType", "createdAt", "id", "updatedAt") SELECT "altText", "blob", "contentType", "createdAt", "id", "updatedAt" FROM "ArticleImage";
DROP TABLE "ArticleImage";
ALTER TABLE "new_ArticleImage" RENAME TO "ArticleImage";
CREATE INDEX "ArticleImage_articleId_idx" ON "ArticleImage"("articleId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
