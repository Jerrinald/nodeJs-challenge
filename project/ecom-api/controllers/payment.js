


module.exports = function Controller(Service, options = {}) {
    return {
        testPay: async (req, res, next) => {
            try {
                const response = await fetch('http://localhost:3000/transactions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "orderId": 1,
                        "marchandId": null,
                        "clientId": null,
                        "clientName": null,
                        "amount": null,
                        "status": "new",
                        "link_payment": "/payment",
                        "createdAt": "2023-08-10T11:47:01.048Z",
                        "updatedAt": "2023-08-10T12:48:44.424Z"
                    }),
                });
                //return response.json;
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

            } catch (err) {
                next(err);
            }
        },

        create: async (req, res, next) => {
            const { body } = req;
            try {
                const result = await Service.create(body);
                res.status(201).json(result);
            } catch (err) {
                next(err);
            }
        },
    };
};








