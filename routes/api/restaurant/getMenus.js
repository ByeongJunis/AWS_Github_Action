'use strict'
const { readAll } = require('../../../model')

module.exports = async function (fastify, opts) {
    fastify.get('/', async function (request, reply) {
      try {
        const restaurants = await readAll(this.mongo,'restaurants');
        if(restaurants === []) {
          return reply
            .code(404)
            .header('Content-Type','application/json')
            .send("Error : Not Found")
        }
        else {
          return reply
            .code(200)
            .header('Content-Type','application/json')
            .send(restaurants)
        }
      } catch (error) {
        return reply
            .code(500)
            .header('Content-Type','application/json')
            .send({"Error":"Sibal"})
      }
    })
}