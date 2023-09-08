import * as Joi from 'joi';

const requiredEnvVariables = {
  PROJECT_NAME: Joi.string().required(),
};

const envValidationSchema = Joi.object(requiredEnvVariables);

export default envValidationSchema;
