import OrderRepository from '../repositories/account.repository.js'

async function create (order) {
  return await OrderRepository.insertOrder(order)
}

async function update (order) {
  return await OrderRepository.updateOrder(order)
}

export default {
  create,
  update
}