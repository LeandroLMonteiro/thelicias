import { createSwaggerSpec } from 'next-swagger-doc';

const apiConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Thelicias API Documentation',
    version: '1.0.0',
    description: 'API documentation for Thelicias application'
  },
  apis: ['./pages/api/**/*.ts'],
  components: {
    schemas: {
      DadosConf: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          tipo: { type: 'string' },
          itens: {
            type: 'array',
            items: { $ref: '#/components/schemas/DadosConfItem' }
          }
        }
      },
      DadosConfItem: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          idDadosConf: { type: 'integer' },
          descricao: { type: 'string' },
          manuseioEspecial: { type: 'string' }
        }
      }
    }
  }
};

export const getSwaggerSpec = () => {
  return createSwaggerSpec({
    definition: apiConfig,
    apiFolder: 'pages/api'
  });
};