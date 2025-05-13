import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import { useEffect, useState } from 'react';

const SwaggerUI = dynamic<{ spec: any }>(import('swagger-ui-react'), { ssr: false });

function ApiDocsUI() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch('/api/api-docs')
      .then((res) => res.json())
      .then((data) => setSpec(data));
  }, []);

  if (!spec) {
    return <div>Carregando documentação...</div>;
  }

  const swaggerProps = {
    docExpansion: "list",
    defaultModelsExpandDepth: 5,
    filter: true,
    tagsSorter: "alpha",
    operationsSorter: "alpha",
  };
  

  return <SwaggerUI {...swaggerProps} spec={spec} />;
}

export default ApiDocsUI;