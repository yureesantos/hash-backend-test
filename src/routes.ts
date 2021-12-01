import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import * as CheckoutController from './controllers/checkout';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();
router.post('/checkout', CheckoutController.add);

// Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
