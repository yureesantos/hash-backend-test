import { ChannelCredentials } from '@grpc/grpc-js';
import { DiscountClient } from '../../proto/discounts_grpc_pb';
import { GetDiscountRequest } from '../../proto/discounts_pb';

import logger from '../logger';

const client = new DiscountClient(
  `localhost:${process.env.GRPC_PORT}`,
  ChannelCredentials.createInsecure()
);

function getDiscount(id?: number) {
  const productId = new GetDiscountRequest().setProductid(id);
  return new Promise((resolve, reject) => {
    client.getDiscount(productId, (err, discount) => {
      if (err) return reject(err);
      logger.info({
        message: `Discount service: ${discount.toObject().percentage}`
      });

      return resolve(discount.toObject().percentage);
    });
  });
}
export { getDiscount };
