
/**
 * @swagger
 * /dados-conf:
 *   get:
 *     summary: Lista todas as configurações
 *     tags: [Configurações]
  *     responses:
 *       200:
 *         description: Lista de configurações encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DadosConf'
 *       500:
 *         description: Erro interno do servidor
 *   post:
 *     summary: Cria uma nova configuração
 *     tags: [Configurações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDadosConfDto'
 *     responses:
 *       201:
 *         description: Configuração criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */

import { NextApiRequest, NextApiResponse } from "next";
import dadosConfService from "@/services/DadosConfService";
import { CreateDadosConfDto } from "@/dtos/CreateDadosConfDto";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import initializeDatabase from '@/database/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await initializeDatabase();

    switch (req.method) {
      case "GET":
        const dadosConfList = await dadosConfService.findAll();
        res.status(200).json(dadosConfList);
        break;
      case "POST":
        const createDadosConfDto = plainToClass(CreateDadosConfDto, req.body);
        const errors = await validate(createDadosConfDto);
        if (errors.length > 0) {
          return res.status(400).json(errors);
        }
        const newDadosConf = await dadosConfService.create(createDadosConfDto);
        res.status(201).json(newDadosConf);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
  } catch (error) {
    console.error("Erro na API de DadosConf:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}
