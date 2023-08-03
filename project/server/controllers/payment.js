module.exports = function Controller(options = {}) {
  return {
    testPay: async (req, res, next) => {
      try {
        res.json({ message: "merci pour votre paiement " });
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