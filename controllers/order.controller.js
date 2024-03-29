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

async function updateDelivery (req, res, next) {
  try {
    let updatedOrder = req.body

    if (!updatedOrder.id)  throw new Error ('Campos  obrigatórios não preenchidos')

    updatedOrder =  await OrderService.updateDelivery(updatedOrder)
    if (updatedOrder.Error) throw new Error (updatedOrder.Error)

    logger.info(`PATCH /order/updateDelivery - ${JSON.stringify(updatedOrder)}`)
    res.send(updatedOrder)
  } catch (error) {
    next(error)
  }
}

async function deleteOrder (req, res, next) {
  try {
    const { id } = req.params

    await OrderService.deleteOrder(parseInt(id))

    logger.info(`DELETE /order/:id => order deleted = ${id}`)
    res.end()
  } catch (error) {
    next(error)
  }
}

async function getOrder (req, res, next) {
  try {
    const { id } = req.params

    const order = await OrderService.getOrder(parseInt(id))

    logger.info(`GET /order/:id => order = ${id}`)
    res.send(order)
  } catch (error) {
    next(error)
  }
}

async function getTotalValueByCustomer (req, res, next) {
  try {
    const { customer } = req.params
    const orders = await OrderService.getTotalValueByCustomer(customer)

    logger.info(`GET /order/totalValueCustomers/:customer => order = ${customer}`)
    res.send(orders)
  } catch (error) {
    next(error)
  }
}

async function getTotalValueByProduct (req, res, next) {
  try {
    const { product } = req.params
    const orders = await OrderService.getTotalValueByProduct(product) 

    logger.info(`GET /order/totalValueProducts/:product => order = ${product}`)
    res.send(orders)
  } catch (error) {
    next(error)
  }
}

async function getMoreSoldProducts (req, res, next) {
  try {
    const orders = await OrderService.getMoreSoldProducts() 

    logger.info('GET /order/getMoreSoldProducts/')
    res.send(orders)
  } catch (error) {
    next(error)
  }
}

export default {
  createOrder,
  updateOrder,
  updateDelivery,
  deleteOrder,
  getOrder,
  getTotalValueByCustomer,
  getTotalValueByProduct,
  getMoreSoldProducts
}
