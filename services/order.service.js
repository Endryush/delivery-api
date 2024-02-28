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

export default {
  create,
  update,
  updateDelivery
}