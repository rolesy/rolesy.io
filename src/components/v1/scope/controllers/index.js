import scopeServices from '../services';

const createScope = async (req, res) => {
  res.status(201).json({
    status: 201,
    message: 'Success',
    data: await scopeServices.createScope({ ...req.body }),
  });
};

const getScopeById = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Success',
    data: await scopeServices.getScopeById(req.params.id),
  });
};

export default {
  createScope,
  getScopeById,
};
