const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Ticket', {
  title: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  archived: Joi.bool().required(),
  major: Joi.string().required(),
  studentId: Joi.number().required(),
});
