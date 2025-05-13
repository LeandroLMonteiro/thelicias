/**
 * @swagger
 * /dados-conf/{id}/itens/{itemId}:
 *   get:
 *     summary: Obtém um item específico de uma configuração por ID
 *     tags: [Configurações - Itens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DadosConfItem'
 *   put:
 *     summary: Atualiza um item específico de uma configuração por ID
 *     tags: [Configurações - Itens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDadosConfItemDto'
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *   delete:
 *     summary: Remove um item específico de uma configuração por ID
 *     tags: [Configurações - Itens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Item removido com sucesso
 */

import { NextApiRequest, NextApiResponse } from "next";
import dadosConfService from "@/services/dadosConfService";
import { UpdateDadosConfItemDto } from "@/dtos/updateDadosConfItemDto";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { AppDataSource } from "@/database/data-source";
import initializeDatabase from "@/database/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, itemId } = req.query;
  const dadosConfId = parseInt(id as string, 10);
  const dadosConfItemId = parseInt(itemId as string, 10);

  try {
    await initializeDatabase();

    if (isNaN(dadosConfId) || isNaN(dadosConfItemId)) {
      return res.status(400).json({ message: "IDs inválidos" });
    }

    switch (req.method) {
      case "GET":
        const item = await dadosConfService.findOneItem(
          dadosConfId,
          dadosConfItemId
        );
        if (!item) {
          return res.status(404).json({ message: "Item não encontrado" });
        }
        res.status(200).json(item);
        break;
      case "PUT":
        const updateDadosConfItemDto = plainToClass(
          UpdateDadosConfItemDto,
          req.body
        );
        const errors = await validate(updateDadosConfItemDto);
        if (errors.length > 0) {
          return res.status(400).json(errors);
        }
        const updatedItem = await dadosConfService.updateItem(
          dadosConfId,
          dadosConfItemId,
          updateDadosConfItemDto
        );
        if (!updatedItem) {
          return res.status(404).json({ message: "Item não encontrado" });
        }
        res.status(200).json(updatedItem);
        break;
      case "DELETE":
        const deleted = await dadosConfService.deleteItem(
          dadosConfId,
          dadosConfItemId
        );
        if (!deleted) {
          return res.status(404).json({ message: "Item não encontrado" });
        }
        res.status(204).end(); // No Content
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
  } catch (error) {
    console.error(
      `Erro na API de Item de DadosConf com ID ${dadosConfId} e Item ID ${dadosConfItemId}:`,
      error
    );
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}
