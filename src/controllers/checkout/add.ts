import { Request, RequestHandler } from 'express';
import Joi from '@hapi/joi';
import database from '../../database/products.json';
import requestMiddleware from '../../middleware/request-middleware';
import logger from '../../logger';
import { getDiscount } from '../../client';

export const addCartSchema = Joi.object().keys({
  products: Joi.array().items({
    id: Joi.number().required(),
    quantity: Joi.number().required()
  })
});

type Products = {
  id: number;
  quantity: number;
};

interface AddReqBody {
  products: Products[];
}

const add: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const { products } = req.body;
  const productsList: any = [];
  const checkoutValues: any = {};

  for (let i = 0; i < products.length; i += 1) {
    const productData = database.find(item => products[i].id === item.id);
    if (!productData.is_gift) {
      const discountPercentage = await getDiscount(products[i].id);
      const discountValue = Math.trunc(
        productData.amount * <number>discountPercentage
      );
      productsList.push({
        id: products[i].id,
        quantity: products[i].quantity,
        unit_amount: productData.amount,
        total_amount: products[i].quantity * productData.amount,
        discount:
          discountValue > 0 || discountValue === null ? discountValue : 0,
        is_gift: false
      });
    } else {
      logger.warn({ warn: 'Gift products isnt available' });
      return res.status(400).send({ message: 'Gift products isnt available' });
    }

    const date = new Date().toLocaleString();
    if (date === process.env.BLACK_FRIDAY) {
      const giftedProduct = database.find(e => e.is_gift === true);

      if (giftedProduct) {
        productsList.push({
          id: giftedProduct.id,
          quantity: process.env.GIFT_QUANTITY,
          unit_amount: 0,
          total_amount: 0,
          discount: 0,
          is_gift: giftedProduct.is_gift
        });
      } else logger.warn({ warn: 'Gift promotion is over' });
    }
  }

  let totalAmount = 0;
  let totalAmountWithDiscount = 0;
  let totalDiscount = 0;

  productsList.forEach((item: { total_amount: number; discount: number }) => {
    totalAmount += item.total_amount;
    totalAmountWithDiscount += item.total_amount - item.discount;
    totalDiscount += item.discount;
  });

  Object.assign(checkoutValues, {
    total_amount: totalAmount,
    total_amount_with_discount: totalAmountWithDiscount,
    total_discount: totalDiscount
  });

  const checkoutResponse = { ...checkoutValues, products: productsList };

  return res.status(200).send(checkoutResponse);
};

export default requestMiddleware(add, { validation: { body: addCartSchema } });
