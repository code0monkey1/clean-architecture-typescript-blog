export interface JWTGeneratorOptions {
  algorithm?: string;
  expiresIn?: string;
  issuer?: string;
  jwtId?: string;
}

export interface JWTGenerator {
  generate(payload: string, jwtOptions?: JWTGeneratorOptions): Promise<string>;
}
