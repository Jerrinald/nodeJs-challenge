module.exports = function Controller(Service, options = {}) {
  return {
    getAll: async (req, res, next) => {
      const { page, itemsPerPage, order, ...filters } = req.query;
      try {
        const results = await Service.findAll(filters, {
          order,
          limit: itemsPerPage,
          offset: (page - 1) * itemsPerPage,
        });

        res.json(results);
      } catch (err) {
        next(err);
      }
    },
    getOne: async (req, res, next) => {
      const { id } = req.params;
      try {
        const result = await Service.findOne({ id: parseInt(id, 10) });
        if (result) res.json(result);
        else res.sendStatus(404);
      } catch (err) {
        next(err);
      }
    },
    getCredential: async (req, res, next) => {
      const { clientID, clientSecret } = req.body;
      console.log(clientID, clientSecret);
      try {
        const result = await Service.findCredential(clientID, clientSecret);
        const marchandId = result.dataValues.id;
        if (result) res.json(marchandId);
        else res.sendStatus(404);
      } catch (err) {
        next(err);
      }
    },
    getAllByMerchantId: async (req, res, next) => {
        const { page, itemsPerPage, order, ...filters } = req.query;
        const { marchandId } = req.params;

        try {
          const results = await Service.findAllByMerchantId(marchandId, filters, {
            order,
            limit: itemsPerPage,
            offset: (page - 1) * itemsPerPage,
          });

          res.json(results);
        } catch (err) {
          next(err);
        }
    },
    getOpeByMerchantId: async (req, res, next) => {
      const { page, itemsPerPage, order, ...filters } = req.query;
      const { marchandId } = req.params;

      try {
        const results = await Service.findOpeByMerchantId(marchandId, filters, {
          order,
          limit: itemsPerPage,
          offset: (page - 1) * itemsPerPage,
        });

        res.json(results);
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
    replace: async (req, res, next) => {
      const { id } = req.params;
      const { body } = req;
      try {
        const [[result, created]] = await Service.replace(
          { id: parseInt(id, 10) },
          { id: parseInt(id, 10), ...body }
        );
        if (created) res.status(201).json(result);
        else res.json(result);
      } catch (err) {
        next(err);
      }
    },
    update: async (req, res, next) => {
      const { id } = req.params;
      const { body } = req;
      try {
        const [result] = await Service.update({ id: parseInt(id, 10) }, body);
        if (result) res.json(result);
        else res.sendStatus(404);
      } catch (err) {
        next(err);
      }
    },
    delete: async (req, res, next) => {
      const { id } = req.params;
      try {
        const nbDeleted = await Service.delete({ id: parseInt(id, 10) });
        if (nbDeleted) res.sendStatus(204);
        else res.sendStatus(404);
      } catch (err) {
        next(err);
      }
    },
  };
};
