import express from 'express'
import orderController from '../controllers/order.controller.js'

const router = express.Router()

router
  .post('/', orderController.createOrder)
  .put('/', orderController.updateOrder)
  .patch('/updateDelivery', orderController.updateDelivery)


  .use ((error, req, res, next) => {
    logger.error(`${req.method} => ${req.baseUrl} ${error.message}`)
    res.status(500).send({ error: error.message })
  })

export default router
