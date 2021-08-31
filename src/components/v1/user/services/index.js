import cryptoJs from 'crypto-js';
import boom from '@hapi/boom';

import userDao from '../DAO';
import env from '../../../../configs';

const createNewUser = async ({ username, password }) => {
  const validateUniqueUsername = await userDao.findUserByUsername(username);

  if (validateUniqueUsername) throw boom.badRequest('Username already exists');

  const encryptedPassword = cryptoJs.AES.encrypt(password, env.CRYPTO_SECRET);
  const createdUser = await userDao.newUser({ username, password: encryptedPassword });

  if (!createdUser) throw boom.internal('Error trying to create new user');
  return createdUser;
};

export default createNewUser;
