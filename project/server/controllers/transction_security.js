const jwt = require("jsonwebtoken");

module.exports = function SecurityController(UserService, MarchandService) {
    return {
        login: async (req, res, next) => {
            try {
                const { token_marchand } = req.body; // Assuming the token is now passed as "token_marchand" in the request body.
                const merchant = await MarchandService.findByToken(token_marchand);

                if (!merchant) {
                    return res.status(401).json({ error: "Invalid merchant token." });
                }

                // Generate and send the token as a response to the successful login.
                const token = jwt.sign(
                    { id: merchant.id, firstname: merchant.firstname, lastname: merchant.lastname, fullName: merchant.lastname + " " + merchant.firstname },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: null, // Set expiresIn to null for an indefinite token validity.
                    }
                );
                res.json({ token });
            } catch (err) {
                next(err);
            }
        },

        authenticateMerchant: async (req, res, next) => {
            const token = req.headers.authorization; // Assuming the token is passed in the "Authorization" header.

            if (!token) {
                return res.status(401).json({ error: "No token provided." });
            }

            try {
                // Decode the token to extract the merchant ID (you can include additional data in the token if needed).
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

                // Find the merchant using the decoded merchant ID (you may need to modify this part depending on your database setup).
                const merchant = await MarchandService.findByToken(decodedToken.token_marchand);

                if (!merchant || !(await merchant.istokenValid(token))) {
                    return res.status(401).json({ error: "Invalid token." });
                }

                // Authentication successful. Proceed to the next middleware or route handler.
                req.merchant = merchant; // You can store the authenticated merchant in the request for further use.
                next();
            } catch (err) {
                return res.status(401).json({ error: "Invalid token." });
            }
        },
    };
};

