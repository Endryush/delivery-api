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
  return await OrderRepository.deleteOrder(id)
}

async function getOrder (id) {
  return await OrderRepository.getOrderById(id)
}

async function getTotalValueByCustomer (customer) {
  return await  OrderRepository.getTotalValueByCustomer(customer)
}

async function getTotalValueByProduct (product) {
  return await  OrderRepository.getTotalValueByProduct(product)
}

async function getMoreSoldProducts () {
  return OrderRepository.getMoreSoldProducts()
}

export default {
  create,
  update,
  updateDelivery,
  deleteOrder,
  getOrder,
  getTotalValueByCustomer,
  getTotalValueByProduct,
  getMoreSoldProducts
}