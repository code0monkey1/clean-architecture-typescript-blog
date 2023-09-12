import { MissingParamError } from '@infra/http/errors/MissingParamError';
import { Validation } from '@infra/http/interfaces/Validation';

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error | null {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
    return null;
  }
}
