/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/indent */
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { BaseMiddleware } from '@infra/http/middlewares/BaseMiddleware';
import { NextFunction, Request, Response } from 'express';

export const expressMiddlewareAdapter =
  (middleware: BaseMiddleware) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      headers: req.headers,
    };
    const httpResponse = await middleware.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body);
      next();
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body?.message,
      });
    }
  };
