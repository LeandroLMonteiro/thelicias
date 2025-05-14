/**
 * @swagger
 * /dados-conf/{id}:
 *   get:
 *     summary: Lista a configuração por ID exibe os detalhes
 *     tags: [Configurações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da configuração
 *     responses:
 *       200:
 *         description: Configuração encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DadosConf'
 *       404:
 *         description: Configuração não encontrada
 *   put:
 *     summary: Atualiza uma configuração por ID
 *     tags: [Configurações]
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
 *             $ref: '#/components/schemas/UpdateDadosConfDto'
 *     responses:
 *       200:
 *         description: Configuração atualizada com sucesso
 *       404:
 *         description: Configuração não encontrada
 *   delete:
 *     summary: Remove uma configuração por ID
 *     tags: [Configurações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Configuração removida com sucesso
 *       404:
 *         description: Configuração não encontrada
 */

import { NextApiRequest, NextApiResponse } from "next";
import dadosConfService from "@/services/dadosConfService";
import { UpdateDadosConfDto } from "@/dtos/updateDadosConfDto";
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
      return res.status(400).json({ message: "Classe Configuração inválida" });
    }

    switch (req.method) {
      case "GET":
        const dadosConf = await dadosConfService.findOne(dadosConfId);
        if (!dadosConf) {
          return res
            .status(404)
            .json({ message: "Classe Configuração não encontrada" });
        }
        res.status(200).json(dadosConf);
        break;
      case "PUT":
        const updateDadosConfDto = plainToClass(UpdateDadosConfDto, req.body);
        const errors = await validate(updateDadosConfDto);
        if (errors.length > 0) {
          return res.status(400).json(errors);
        }
        const updatedDadosConf = await dadosConfService.update(
          dadosConfId,
          updateDadosConfDto
        );
        if (!updatedDadosConf) {
          return res
            .status(404)
            .json({ message: "Classe Configuração não encontrada" });
        }
        res.status(200).json(updatedDadosConf);
        break;
      case "DELETE":
        const deleted = await dadosConfService.delete(dadosConfId);
        if (!deleted) {
          return res
            .status(404)
            .json({ message: "Classe Configuração não encontrada" });
        }
        res.status(204).end(); // No Content
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
  } catch (error) {
    console.error(`Erro na API de DadosConf com ID ${dadosConfId}:`, error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}
