import type { NextApiRequest, NextApiResponse } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import { apiConfig } from '@/swagger/config';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const spec = createSwaggerSpec({
    definition: {
      ...apiConfig,
      servers: [
        {
          url: '/api',
          description: 'API Server',
        },
      ],
      tags: [],
    },
    apiFolder: 'pages/api',
    schemaFolders: ['src/swagger'],
  });

  res.status(200).json(spec);
}