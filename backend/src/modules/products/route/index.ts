import { Router } from 'express';
import ProductsController from '../controller/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRoute = Router();
const productsController = new ProductsController();

productsRoute.get('/products', productsController.list);

productsRoute.get(
    '/product/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required()
        }
    }),
    productsController.show
);

productsRoute.post(
    '/product',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string()
                .pattern(new RegExp('^[a-zA-ZÀ-ú0-9 _]*$'))
                .trim().min(1).max(50).required().messages({
                    'string.base': `"name" deve ser um tipo de 'texto'.`,
                    'string.empty': `"name" não pode ser um campo vazio.`,
                    'string.min': `"name" deve ter um comprimento mínimo de {#limit}.`,
                    'string.max': `"name" deve ter um comprimento máximo de {#limit}.`,
                    'string.pattern.base': `"name" deve ter o padrão exigido {#regex}.`,
                    'any.required': `"name" é um campo obrigatório.`
                }),
            description: Joi.string()
                .pattern(new RegExp('^[a-zA-ZÀ-ú0-9 _]*$'))
                .trim().min(1).max(500).required().messages({
                    'string.base': `"description" deve ser um tipo de 'texto'.`,
                    'string.empty': `"description" não pode ser um campo vazio.`,
                    'string.min': `"description" deve ter um comprimento mínimo de {#limit}.`,
                    'string.max': `"description" deve ter um comprimento máximo de {#limit}.`,
                    'string.pattern.base': `"description" deve ter o padrão exigido {#regex}.`,
                    'any.required': `"description" é um campo obrigatório.`
                }),
            price: Joi.number().min(1).max(99999999).required().messages({
                'number.base': `"price" deve ser um tipo de 'número'.`,
                'number.empty': `"price" não pode ser um campo vazio.`,
                'number.min': `"price" deve ter um comprimento mínimo de {#limit}.`,
                'number.max': `"price" deve ter um comprimento máximo de {#limit}.`,
                'any.required': `"price" é um campo obrigatório.`
            }),
            active: Joi.boolean().required().messages({
                'boolean.base': `"active" deve ser um tipo de 'boleano'.`,
                'boolean.empty': `"active" não pode ser um campo vazio.`,
                'boolean.min': `"active" deve ter um comprimento mínimo de {#limit}.`,
                'boolean.max': `"active" deve ter um comprimento máximo de {#limit}.`,
                'any.required': `"active" é um campo obrigatório.`
            })
        }
    }, { abortEarly: false }),
    productsController.create
);

productsRoute.put(
    '/product',
    celebrate({
        [Segments.BODY]: {
            id: Joi.string().required().messages({
                'string.base': `"id" deve ser um tipo de 'texto'.`,
                'string.empty': `"id" não pode ser um campo vazio.`,
                'string.min': `"id" deve ter um comprimento mínimo de {#limit}.`,
                'string.max': `"id" deve ter um comprimento máximo de {#limit}.`,
                'any.required': `"id" é um campo obrigatório.`
            }),
            name: Joi.string()
                .pattern(new RegExp('^[a-zA-ZÀ-ú0-9 _]*$'))
                .trim().min(1).max(50).required().messages({
                    'string.base': `"name" deve ser um tipo de 'texto'.`,
                    'string.empty': `"name" não pode ser um campo vazio.`,
                    'string.min': `"name" deve ter um comprimento mínimo de {#limit}.`,
                    'string.max': `"name" deve ter um comprimento máximo de {#limit}.`,
                    'string.pattern.base': `"name" deve ter o padrão exigido {#regex}.`,
                    'any.required': `"name" é um campo obrigatório.`
                }),
            description: Joi.string()
                .pattern(new RegExp('^[a-zA-ZÀ-ú0-9 _]*$'))
                .trim().min(1).max(500).required().messages({
                    'string.base': `"description" deve ser um tipo de 'texto'.`,
                    'string.empty': `"description" não pode ser um campo vazio.`,
                    'string.min': `"description" deve ter um comprimento mínimo de {#limit}.`,
                    'string.max': `"description" deve ter um comprimento máximo de {#limit}.`,
                    'string.pattern.base': `"description" deve ter o padrão exigido {#regex}.`,
                    'any.required': `"description" é um campo obrigatório.`
                }),
            price: Joi.number().min(1).max(99999999).required().messages({
                'number.base': `"price" deve ser um tipo de 'número'.`,
                'number.empty': `"price" não pode ser um campo vazio.`,
                'number.min': `"price" deve ter um comprimento mínimo de {#limit}.`,
                'number.max': `"price" deve ter um comprimento máximo de {#limit}.`,
                'any.required': `"price" é um campo obrigatório.`
            }),
            active: Joi.boolean().required().messages({
                'boolean.base': `"active" deve ser um tipo de 'boleano'.`,
                'boolean.empty': `"active" não pode ser um campo vazio.`,
                'boolean.min': `"active" deve ter um comprimento mínimo de {#limit}.`,
                'boolean.max': `"active" deve ter um comprimento máximo de {#limit}.`,
                'any.required': `"active" é um campo obrigatório.`
            })
        }
    }),
    productsController.update
);

productsRoute.delete(
    '/product/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required()
        }
    }),
    productsController.delete
);

productsRoute.patch(
    '/product/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required()
        },
        [Segments.QUERY]: {
            active: Joi.boolean().required().messages({
                'boolean.base': `"active" deve ser um tipo de 'boleano'.`,
                'boolean.empty': `"active" não pode ser um campo vazio.`,
                'boolean.min': `"active" deve ter um comprimento mínimo de {#limit}.`,
                'boolean.max': `"active" deve ter um comprimento máximo de {#limit}.`,
                'any.required': `"active" é um campo obrigatório.`
            })
        }
    }),
    productsController.updateActive
);

export default productsRoute;