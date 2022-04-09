'use strict'
const { PatchOne, readOne, readAll } = require('../../../model')

module.exports = async function (fastify, opts) {
    fastify.patch('/:id/status', async function (request, reply) {
        const updateValue = request.body.status;
        try {
            const restaurants = await readAll(this.mongo,'restaurants');
            let goingPatch = await readOne(this.mongo, 'order', request.params.id);
            goingPatch.deliveryInfo.status = updateValue;
            const updated = await PatchOne(this.mongo, 'order', request.params.id, goingPatch);
            if(updated) {   
                const menus = [];
                restaurants.forEach(restaurant => restaurant.menu.forEach(element => menus.push(element))); 
                const getMenus = updated.value.orderedMenu;
                const _id = updated.value._id;
                const orderedMenu = [];
                menus.forEach(m => {
                for (let i = 0; i < getMenus.length; i++) {
                    if(m.name == getMenus[i].name){
                        getMenus[i]._id = m._id;
                        orderedMenu.push(getMenus[i]);
                    }
                }})
                const status = updated.value.deliveryInfo.status;
                const estimatedDeleveryTime = updated.value.deliveryInfo.estimatedDeleveryTime;
                const deliveryInfo = {status, estimatedDeleveryTime};
                return reply
                    .code(201)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send({ _id, orderedMenu, deliveryInfo });
            }
            else {
                return reply
                .code(404)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send({ "Error" : "Not Found" });
            }
        } catch (error) {
            console.log('Error :', error);
            return reply
                .code(500)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send({ "Error" : "Server Error" });
        }
    })    
}