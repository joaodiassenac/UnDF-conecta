/*
  Warnings:

  - You are about to drop the `ConfirmacaoPresenca` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ConfirmacaoPresenca` DROP FOREIGN KEY `ConfirmacaoPresenca_eventoId_fkey`;

-- DropTable
DROP TABLE `ConfirmacaoPresenca`;