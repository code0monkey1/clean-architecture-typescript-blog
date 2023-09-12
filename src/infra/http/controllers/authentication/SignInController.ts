import { UnauthorizedError } from '@application/errors/UnauthorizedError';
import { SignInInterface } from '@application/interfaces/use-cases/authentication/SignInInterface';
import { BaseController } from '@infra/http/controllers/BaseController';
import { ok, unauthorized } from '@infra/http/helpers/http';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { Validation } from '@infra/http/interfaces/Validation';

export class SignInController extends BaseController {
  constructor(
    signInValidation: Validation,
    private readonly signIn: SignInInterface,
  ) {
    super(signInValidation);
  }

  async execute(
    httpRequest: SignInController.Request,
  ): Promise<SignInController.Response> {
    const { email, password } = httpRequest.body!;
    const authenticationTokenOrError = await this.signIn.execute({
      email,
      password,
    });
    if (authenticationTokenOrError instanceof UnauthorizedError) {
      return unauthorized(authenticationTokenOrError);
    }
    return ok({
      authenticationToken: authenticationTokenOrError,
    });
  }
}

export namespace SignInController {
  export type Request = HttpRequest<SignInInterface.Request>;
  export type Response = HttpResponse<
  { authenticationToken: string } | UnauthorizedError
  >;
}
