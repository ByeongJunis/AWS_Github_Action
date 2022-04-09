'use strict'
const { readAll } = require('../../../model')

module.exports = async function (fastify, opts) {
    fastify.get('/', async function (request, reply) {
        const result = await readAll(this.mongo,'order');
        const result2 = await readAll(this.mongo,'restaurants');
        
        result[0].orderedMenu[0]._id=result2[2].menu[0]._id
        result[0].orderedMenu[1]._id=result2[2].menu[1]._id
        
        if(result === []){
            reply
              .code(404)
              .header('Content-Type','application/json')
              .send("error : Not Found")
          }else{
            const deliverStatus = result[0].deliveryInfo.status;
            const estimatedTime = result[0].deliveryInfo.estimatedDeleveryTime;
            const deliveryInfo = { deliverStatus, estimatedTime };
           reply
            .code(200)
            .header('Content-Type','application/json')
            .send({_id:result[0]._id,orderedMenu:result[0].orderedMenu,deliveryInfo:deliveryInfo})
          }

    }
    )
}