import express from 'express'
import orderController from '../controllers/order.controller.js'

const router = express.Router()

router
  .post('/', orderController.createOrder)
  .put('/', orderController.updateOrder)
  .patch('/updateDelivery', orderController.updateDelivery)
  .delete('/:id', orderController.deleteOrder)
  .get('/get/:id', orderController.getOrder)
  .get('/totalValueCustomers/:customer', orderController.getTotalValueByCustomer)
  .get('/totalValueProducts/:product', orderController.getTotalValueByProduct)
  .get('/moreSoldProducts', orderController.getMoreSoldProducts)


  .use ((error, req, res, next) => {
    logger.error(`${req.method} => ${req.baseUrl} ${error.message}`)
    res.status(500).send({ error: error.message })
  })

export default router
