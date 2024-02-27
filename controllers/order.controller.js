import OrderService from '../services/order.service.js'

async function createOrder (req, res) {
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
    logger.error(`${req.method} => ${req.baseUrl} ${error.message}`)
    res.status(500).send({ error: error.message })
  }
}

export default {
  createOrder
}
