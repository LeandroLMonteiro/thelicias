import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import '../src/swagger/schemas';

const SwaggerUI = dynamic<{
  spec: any;
}>(import('swagger-ui-react'), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  const swaggerProps = {
    docExpansion: "list",
    defaultModelsExpandDepth: 5,
    filter: false,
    tagsSorter: "alpha",
    operationsSorter: "alpha",
  };

  return <SwaggerUI {...swaggerProps} spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const spec = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Thelicias API Documentation',
        version: '1.0.0',
        description: 'API de gerenciamento de configurações do Thelicias',
      },
      servers: [
        {
          url: '/api',
          description: 'API Server',
        },
      ],
      tags: [
        {
          name: 'Configurações',
          description: 'Endpoints para gerenciar configurações',
        },
        {
          name: 'Itens de Configuração',
          description: 'Endpoints para gerenciar itens de configuração',
        }
      ]
    },
    apiFolder: 'pages/api',
    schemaFolders: ['src/swagger']
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;