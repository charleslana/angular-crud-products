import { Router } from 'express';
import productsRoute from './modules/products/route';

const routes = Router();

routes.use(productsRoute);

export default routes;