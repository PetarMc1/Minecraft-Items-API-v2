import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerViewer: React.FC = () => {
  return (
    <div>
      <SwaggerUI url="/openapi" />
    </div>
  );
};

export default SwaggerViewer;
