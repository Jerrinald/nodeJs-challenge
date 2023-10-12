module.exports = function Controller(Service, options = {}) {
    return {
        testPay: async (req, res, next) => {
            /* try {

                const credential = await fetch('http://server:3000/credential', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!credential.ok) {
                    throw new Error(`HTTP error! Status: ${credential.status}`);
                }
                //login marchant with credentialID and clientSecret 
                const marchand = await fetch('http://server:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "clientSecret": credential.clientSecret,
                        "clientID": credential.clientID
                    }),
                });
                if (!marchand.ok) {
                    throw new Error(`HTTP error! Status: ${marchand.status}`);
                }
                const marchandData = await marchand.json();

            } catch (err) {
                next(err);
            } */

            try {
                console.log("contenue de la requette :", req.body);
                const response = await fetch('http://server:3100/payment', {
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