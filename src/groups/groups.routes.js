'use strict';

const groupService = require('./groups.service');
const Joi = require('joi');

module.exports = {
  name: 'groups.routes',
  async register (server, options) {

    server.route([

      {
        method: 'POST',
        path: '/api/groups',
        config: {
          validate: {
            payload: Joi.object({
              name: Joi.string().required(),
              avatarUrl: Joi.string().uri({ scheme: 'https' }),
            }).required(),
          },
        },
        handler (request) {
          return groupService.createGroup(request.auth.credentials.id, {
            name: request.payload.name,
            avatarUrl: request.payload.avatarUrl,
          });
        },
      },

      {
        method: 'GET',
        path: '/api/groups/{id}',
        config: {
          validate: {
            params: {
              id: Joi.string().uuid(),
            },
          },
        },
        handler (request) {
          return groupService.getGroup(request.auth.credentials.id, request.params.id);
        },
      },

      {
        method: 'PUT',
        path: '/api/groups/{id}',
        config: {
          validate: {
            params: {
              id: Joi.string().uuid(),
            },
            payload: Joi.object({
              name: Joi.string().required(),
              avatarUrl: Joi.string().uri({ scheme: 'https' }),
            }).required(),
          },
        },
        handler (request) {
          return groupService.updateGroup(request.auth.credentials.id, request.params.id, {
            name: request.payload.name,
            avatarUrl: request.payload.avatarUrl,
          });
        },
      },

    ]);
  },
};
