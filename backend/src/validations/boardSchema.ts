import Joi from "joi";

export const createBoardSchema = Joi.object({
  title: Joi.string().min(2).max(50).required().messages({
    "string.min": "Le titre doit avoir au moins 2 caractères",
    "string.max": "Le titre est trop long",
    "any.required": "Le titre est obligatoire",
  }),
});

export const updateBoardSchema = Joi.object({
  title: Joi.string().min(2).max(50).required().messages({
    "string.min": "Le titre doit avoir au moins 2 caractères",
    "string.max": "Le titre est trop long",
    "any.required": "Le titre est obligatoire",
  }),
});
