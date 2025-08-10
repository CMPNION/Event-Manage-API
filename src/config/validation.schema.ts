import Joi from "joi";

export const validationSchema: Joi.ObjectSchema = Joi.object({
    APP_PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string(),
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.number().default(5432),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().default(6379),
});
