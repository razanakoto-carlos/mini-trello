import Joi from "joi";

export const createCardSchema = Joi.object({
  title: Joi.string().min(1).max(100).required().messages({
    "string.min": "Le titre ne peut pas être vide",
    "string.max": "Le titre est trop long",
    "any.required": "Le titre est obligatoire",
  }),

  listId: Joi.number().integer().positive().required().messages({
    "number.base": "listId doit être un nombre",
    "number.positive": "listId doit être positif",
    "any.required": "listId est obligatoire",
  }),
});

export const updateCardSchema = Joi.object({
  listId: Joi.number().integer().positive().messages({
    "number.base": "listId doit être un nombre",
    "number.positive": "listId doit être positif",
  }),
});
