import accountServices from '../services';

const createAccount = async (req, res) => {
  res.status(201).json({
    status: 201,
    message: 'Success',
    data: await accountServices.createAccount({ ...req.body }),
  });
};

export default {
  createAccount,
};
