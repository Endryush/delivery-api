import { promises as fs} from 'fs'

const { readFile, writeFile } = fs


async function insertOrder (order) {
 try {
  const data = JSON.parse(await readFile(global.filename))

  order = {
    id:  data.nextId ++,
    cliente: order.name,
    produto: order.product,
    valor: order.value,
    entregue: false,
    timestamp: new Date().toISOString()
  }

  data.pedidos.push(order)

  await writeDataOrder(data)

  return order
 } catch (error) {
    return { Error: error }
 }
}

async function updateOrder (order) {
  try {
    const orders = await getAllOrderData()
    const currentOrderIndex = orders.pedidos.findIndex(orderI => orderI.id === order.id)
    if (currentOrderIndex === -1) throw new Error('order not found')
    
    const currentOrder = orders.pedidos[currentOrderIndex]
    
    currentOrder.produto = order.product
    currentOrder.cliente = order.name
    currentOrder.valor = order.value
    currentOrder.entregue = order.delivered

    await writeDataOrder(orders)
    
    return  currentOrder
  } catch (error) {
    return { Error: error }
  }
}

async function updateDelivery (order) {
  try {
    const currentOrder = await getOrderById(order.id)

    if (!currentOrder) throw new  Error("Order doesn't exist")

    currentOrder.entregue = order.delivered
    
    const formattedOrder ={
      id: currentOrder.id,
      product: currentOrder.produto,
      name: currentOrder.cliente,
      value: currentOrder.valor,
      delivered: order.delivered,
      timestamp: currentOrder.timestamp
    }

    await updateOrder(formattedOrder)

    return currentOrder
  } catch (error) {
    return { Error: error }
  }
}

async function getOrderById (id) {
  const orders = await getAllOrderData()
  const currentOrder = orders.pedidos.find(order => order.id === id)

  return  currentOrder
}

async function getAllOrderData () {
  return JSON.parse(await readFile(global.filename))
}

async function writeDataOrder (data) {
  return await writeFile(global.filename, JSON.stringify(data, null, 2))
}


export default {
  insertOrder,
  updateOrder,
  updateDelivery
}