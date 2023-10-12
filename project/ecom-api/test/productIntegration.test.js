const request = require('supertest');
const app = require('../server'); // Now import your application from server.js

describe('Product API', () => {
    it('All products', async () => {
        const res = await request(app)
            .get('/products')
            .expect('Content-Type', /json/)
            .expect(200);

        // Vous pouvez ajouter plus d'assertions ici basées sur vos besoins
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('Find One product', async () => {
        const res = await request(app)
            .get('/products/1')
            .expect('Content-Type', /json/)
            .expect(200);

        // Vous pouvez ajouter plus d'assertions ici basées sur vos besoins
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name');
    });

    it('Create product', async () => {
        const newProduct = { name: 'New Product', price: 100 };

        const res = await request(app)
            .post('/products')
            .send(newProduct)
            .expect('Content-Type', /json/)
            .expect(201);

        // Make sure the product was inserted into the database
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toEqual(newProduct.name);
        expect(res.body.price).toEqual(newProduct.price);
    });

    it('Update product', async () => {
        const updatedProduct = { name: 'Updated Product', price: 150 };

        const res = await request(app)
            .put('/products/1')
            .send(updatedProduct)
            .expect('Content-Type', /json/)
            .expect(200);

        // Make sure the product was updated in the database
        expect(res.body.name).toEqual(updatedProduct.name);
        expect(res.body.price).toEqual(updatedProduct.price);
    });

    it('Delete product', async () => {
        await request(app)
            .delete('/products/1')
            .expect(204);

        // Try to get the deleted product
        const res = await request(app)
            .get('/products/1')
            .expect(404);
    });
});
