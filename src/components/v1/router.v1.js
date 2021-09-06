import authenticationRouter from './authentication/router';
import userRouter from './user/router';
import scopeRouter from './scope/router';
import accountRouter from './account/router';

const routerV1 = (expressApplication) => {
  expressApplication.use('/api/v1/user', userRouter);
  expressApplication.use('/api/v1/authentication', authenticationRouter);
  expressApplication.use('/api/v1/scope', scopeRouter);
  expressApplication.use('/api/v1/account', accountRouter);
};

export default routerV1;
