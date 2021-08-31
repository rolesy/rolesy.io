import scopeServices from '../services';

const createScope = async (req, res) => {
  res.status(201).json({
    status: 201,
    message: 'Success',
    data: await scopeServices.createScope({ ...req.body }),
  });
};

export default {
  createScope,
};
