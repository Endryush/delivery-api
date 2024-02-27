import { promises as fs} from 'fs'

const { readFile, writeFile } = fs


async function insertOrder (order) {
 try {
  const data = JSON.parse(await readFile(global.filename))
  console.log(lla)
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

async function getAllOrderData () {
  return JSON.parse(await readFile(global.filename))
}

async function writeDataOrder (data) {
  return await writeFile(global.filename, JSON.stringify(data, null, 2))
}


export default {
  insertOrder,
  updateOrder
}