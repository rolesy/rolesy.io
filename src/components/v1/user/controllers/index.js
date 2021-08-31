import userServices from '../services';

const createUser = async (req, res) => {
  res.status(201).json({
    status: 201,
    message: 'Success',
    data: await userServices.createNewUser({ ...req.body }),
  });
};

export default {
  createUser,
};
