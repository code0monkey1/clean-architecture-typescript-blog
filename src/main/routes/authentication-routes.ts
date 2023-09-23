import { expressRouteAdapter } from '@main/adapters/express-route-adapter';
import { makeSignInController } from '@main/factories/controllers/authentication/sign-in/controller-factory';
import { makeSignUpController } from '@main/factories/controllers/authentication/sign-up/controller-factory';
import { Router } from 'express';

export default (router: Router): void => {
  router.post('/login', expressRouteAdapter(makeSignInController()));
  router.post('/register', expressRouteAdapter(makeSignUpController()));
};
