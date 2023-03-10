import Joi from 'joi';

export const ReminderSchema = Joi.object().keys({
    _id: Joi.string(),
    _rev: Joi.string(),
    done: Joi.boolean(),
    event: Joi.string(),
    image: Joi.string().uri(),
    memberId: Joi.string(),
    timestamp: Joi.number().required(),
    type: Joi.string().valid('birthday', 'celebration', 'release').required(),
    url: Joi.string().uri()
});
