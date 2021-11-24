import { Request, RequestHandler } from 'express';
import Joi from '@hapi/joi';
import database from '../../database/products.json';
import logger from '../../logger';

export const addCartSchema = Joi.array().items({
  id: Joi.number().required(),
  quantity: Joi.number().required()
});

interface Products {
  id: number;
  quantity: number;
}

interface AddReqBody {
  products: Products[];
}

const add: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const { products } = req.body;
  const productsList = [];
  const noStock = [];

  for (let i = 0; i < products.length; i += 1) {
    if (database.find(e => e.id === products[i].id && e.amount <= 0)) {
      noStock.push(products[i]);
    }
  }

  if (noStock.length > 0) {
    logger.warn({ warn: 'Product doesnt have stock' });
    return res.status(400).send({ error: 'Product doesnt have stock' });
  }

  const date = new Date().toLocaleString();
  if (date === process.env.BLACK_FRIDAY) {
    const giftedProduct = database.find(e => e.is_gift === true);

    if (giftedProduct) {
      productsList.push({
        id: giftedProduct.id,
        quantity: process.env.GIFT_QUANTITY,
        special: true
      });
    } else logger.warn({ warn: 'Gift promotion is over' });
  }

  return productsList;
};
