import OrderRepository from '../repositories/account.repository.js'

async function create (order) {
  return await OrderRepository.insertOrder(order)
}

async function update (order) {
  return await OrderRepository.updateOrder(order)
}

async function updateDelivery (order) {
  return await OrderRepository.updateDelivery(order)
}

async function deleteOrder (id) {
  return await OrderRepository.deleteDelivery(id)
}

export default {
  create,
  update,
  updateDelivery,
  deleteOrder
}