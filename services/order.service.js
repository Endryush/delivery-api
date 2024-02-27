import OrderRepository from '../repositories/account.repository.js'

async function create (order) {
  return await OrderRepository.insertOrder(order)
}

export default {
  create
}