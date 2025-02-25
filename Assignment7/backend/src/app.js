/*
#######################################################################
#
# Copyright (C) 2020-2025 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mailRoutes from './routes/mail.js';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Load your OpenAPI specification (adjust the path if needed)
const swaggerDocument = yaml.load(fs.readFileSync('../backend/api/openapi.yaml', 'utf8'));

// Set up Swagger UI to serve your API docs at /api/v0/docs
app.use('/api/v0/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mount your API routes under /api/v0
app.use('/api/v0', mailRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({error: err.message});
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
