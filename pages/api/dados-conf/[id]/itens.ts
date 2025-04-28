/**
 * @swagger
 * /dados-conf/{id}/itens:
 *   get:
 *     summary: Lista todos os itens de uma configuração
 *     tags: [Itens de Configuração]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da configuração
 *     responses:
 *       200:
 *         description: Lista de itens encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DadosConfItem'
 *   post:
 *     summary: Adiciona um novo item à configuração
 *     tags: [Itens de Configuração]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDadosConfItemDto'
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 *       404:
 *         description: Configuração não encontrada
 */

import { NextApiRequest, NextApiResponse } from "next";
import dadosConfService from "@/services/DadosConfService";
import { CreateDadosConfItemDto } from "@/dtos/CreateDadosConfItemDto";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import initializeDatabase from "@/database/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const dadosConfId = parseInt(id as string, 10);

  try {
    await initializeDatabase();

    if (isNaN(dadosConfId)) {
      return res.status(400).json({ message: "Item de Classe de Configuração inválido" });
    }

    switch (req.method) {
      case "GET":
        const itens = await dadosConfService.findItensByDadosConfId(
          dadosConfId
        );
        res.status(200).json(itens);
        break;
      case "POST":
        const createDadosConfItemDto = plainToClass(
          CreateDadosConfItemDto,
          req.body
        );
        const errors = await validate(createDadosConfItemDto);
        if (errors.length > 0) {
          return res.status(400).json(errors);
        }
        const newItem = await dadosConfService.createItem(
          dadosConfId,
          createDadosConfItemDto
        );
        if (!newItem) {
          return res.status(404).json({ message: "Classe de Configuração não encontrado" });
        }
        res.status(201).json(newItem);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
  } catch (error) {
    console.error(
      `Erro na API de Itens de DadosConf com ID ${dadosConfId}:`,
      error
    );
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}
