module.exports = function Controller(Service, options = {}) {
    return {
        testPay: async (req, res, next) => {
            try {
                console.log("contenue de la requette :", req.body);
                const response = await fetch('http://server:3000/transactions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(req.body),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();
                res.json(responseData);
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