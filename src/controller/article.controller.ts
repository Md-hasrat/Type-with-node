import { Request, Response } from "express";
import { asyncHandler } from "../../utils/errrorHandler";
import { createArticleSchema } from "../zodSchema/articleSchema";
import { responseHandler } from "../../utils/responseHandler";
import Article from "../models/articleModel";


export const createArticle = asyncHandler(async (req: Request, res: Response) => {
  const validate = createArticleSchema.safeParse(req.body);

  if (!validate.success) {
    return responseHandler(res, false, validate.error.errors[0].message, 400);
  }

  const article = await Article.create(validate.data);
  return responseHandler(res, true, "Article created successfully", 201, article);
});

