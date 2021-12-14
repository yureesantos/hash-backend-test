import request from 'supertest';
import app from '../src/app';

describe('Checkout', () => {
  test('check if the selected product is not a gift', done => {
    const giftRequest = {
      products: [
        {
          id: 6,
          quantity: 1
        }
      ]
    };
    request(app)
      .post('/checkout')
      .send(giftRequest)
      .expect(400, done);
  });
  test('check if the checkout product list is correctly', async () => {
    const mockedRequest = {
      products: [
        {
          id: 1,
          quantity: 1
        },
        {
          id: 2,
          quantity: 4
        },
        {
          id: 3,
          quantity: 13
        }
      ]
    };

    await request(app)
      .post('/checkout')
      .send(mockedRequest)
      .expect(200)
      .then(response => {
        const { products } = response.body;
        products.forEach((item: any) => {
          expect(item).toHaveProperty('id');
          expect(item).toHaveProperty('quantity');
          expect(item).toHaveProperty('unit_amount');
          expect(item).toHaveProperty('total_amount');
          expect(item).toHaveProperty('discount');
          expect(item).toHaveProperty('is_gift');
        });
      });
  });
  test('check blackfriday gift', async () => {
    const blackFridayDate = new Date().toLocaleDateString('pt-BR');
    process.env.BLACK_FRIDAY = blackFridayDate;

    const mockedRequest = {
      products: [
        {
          id: 1,
          quantity: 1
        },
        {
          id: 2,
          quantity: 4
        },
        {
          id: 3,
          quantity: 13
        }
      ]
    };

    const mockedRequestLength = mockedRequest.products.length;

    await request(app)
      .post('/checkout')
      .send(mockedRequest)
      .expect(200)
      .then(response => {
        const { products } = response.body;
        expect(products.length).toEqual(mockedRequestLength + 1);
      });
  });
  test('check checkout response details', async () => {
    const blackFridayDate = new Date().toLocaleDateString('pt-BR');
    process.env.BLACK_FRIDAY = blackFridayDate;

    const mockedRequest = {
      products: [
        {
          id: 1,
          quantity: 1
        },
        {
          id: 2,
          quantity: 4
        },
        {
          id: 3,
          quantity: 13
        }
      ]
    };

    await request(app)
      .post('/checkout')
      .send(mockedRequest)
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('total_amount');
        expect(response.body).toHaveProperty('total_amount_with_discount');
        expect(response.body).toHaveProperty('total_discount');
      });
  });
});
