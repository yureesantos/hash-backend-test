import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import * as CheckoutController from './controllers/checkout';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();
router.post('/checkout', CheckoutController.add);

export default router;
