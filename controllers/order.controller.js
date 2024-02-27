import OrderService from '../services/order.service.js'

async function createOrder (req, res, next) {
  try {
    let order = req.body

    if (!order.name || !order.value || !order.product) {
      throw new Error ('Campos  obrigatórios não preenchidos')
    }

    order = await OrderService.create(order)

    if (!order) throw new Error('Erro ao adicionar pedido')
    if (order.Error) throw new Error (order.Error)
    
    logger.info(`POST /order - ${JSON.stringify(order)}`)
    res.send(order)
  } catch (error) {
    next(error)
  }
}

async function updateOrder (req, res, next) {
  try {
    let order = req.body

    if (!order.name || !order.value || !order.product  || !order.id) {
      throw new Error ('Campos  obrigatórios não preenchidos')
    }

    const updatedOrder = await OrderService.update(order)
    if (updatedOrder.Error) throw new Error (updatedOrder.Error)

    logger.info(`PUT /order - ${JSON.stringify(order)}`)
    res.send(updatedOrder)
  } catch (error) {
    next(error)
  }
}

export default {
  createOrder,
  updateOrder
}
