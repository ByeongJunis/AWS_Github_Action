'use strict'
const { readAll } = require('../../../model');
const restaurant = require('../restaurant');

module.exports = async function (fastify, opts) {
    fastify.get('/', async function (request, reply) {
      try {
        const orderHistory = await readAll(this.mongo,'order');
        const restaurants = await readAll(this.mongo,'restaurants');
        console.log(orderHistory);
        if(orderHistory === [] || restaurants === []) {
          return reply
            .code(404)
            .header('Content-Type','application/json')
            .send("Error : Not Found")
        }
        else {
          const menus = [];
          restaurants.forEach(restaurant => restaurant.menu.forEach(element => menus.push(element)));
          const packOrderData = (order) => {
            const getMenus = order.orderedMenu;
            const _id = order._id;
            const orderedMenu = [];
            menus.forEach(m => {
              for (let i = 0; i < getMenus.length; i++) {
                if(m.name == getMenus[i].name){
                  getMenus[i]._id = m._id;
                  orderedMenu.push(getMenus[i]);
                }
              }
            })
            const status = order.deliveryInfo.status;
            const estimatedDeleveryTime = order.deliveryInfo.estimatedDeleveryTime;
            const deliveryInfo = {status, estimatedDeleveryTime};
            return { _id, orderedMenu, deliveryInfo };
          }
          const result = [];
          orderHistory.forEach( history => result.push(packOrderData(history)));
          return reply
            .code(200)
            .header('Content-Type','application/json')
            .send(result)
        }
      } catch (error) {
        console.log('error', error);
        return reply
            .code(500)
            .header('Content-Type','application/json')
            .send({"Error":"Server Error"})
      }
       

        

    })
}