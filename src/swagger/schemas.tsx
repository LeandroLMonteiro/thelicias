/**
 * @swagger
 * components:
 *   schemas:
 *     DadosConf:
 *       type: object
 *       properties:
 *         id:
 *           type: serial 
 *           description: ID da configuração
 *         tipo:
 *           type: string
 *           description: Tipo da configuração
 *         itens:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DadosConfItem'
 *     DadosConfItem:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: ID do item
 *         idDadosConf:
 *           type: serial
 *           description: ID da configuração relacionada
 *           formula: "ForeignKey"
 *         descricao:
 *           type: string
 *           description: Descrição do item
 *         manuseioEspecial:
 *           type: string
 *           nullable: true
 *           description: Instruções especiais de manuseio
 *     CreateDadosConfDto:
 *       type: object
 *       required:
 *         - tipo
 *       properties:
 *         tipo:
 *           type: string
 *         itens:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateDadosConfItemDto'
 *     CreateDadosConfItemDto:
 *       type: object
 *       required:
 *         - descricao
 *       properties:
 *         descricao:
 *           type: string
 *         manuseioEspecial:
 *           type: string
 *     UpdateDadosConfDto:
 *       type: object
 *       properties:
 *         tipo:
 *           type: string
 *     UpdateDadosConfItemDto:
 *       type: object
 *       properties:
 *         descricao:
 *           type: string
 *         manuseioEspecial:
 *           type: string
 */

export {}; // Necessário para o TypeScript tratar como módulo