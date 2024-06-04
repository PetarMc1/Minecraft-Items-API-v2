import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import EOLannouncement from './components/EOLannouncement';

const SwaggerViewer: React.FC = () => {
  return (
    <div>
      <EOLannouncement />
      <SwaggerUI url="/openapi" />
    </div>
  );
};

export default SwaggerViewer;
