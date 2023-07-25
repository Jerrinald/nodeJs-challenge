module.exports = function Controller(options = {}) {
    return {
      testPay: async (req, res, next) => {
        try {
          res.json({message : "merci"});
        } catch (err) {
          next(err);
        }
      },
    };
};