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
    return {
      Error: (error)
    }
 }
}

async function writeDataOrder (data) {
  return await writeFile(global.filename, JSON.stringify(data, null, 2))
}


export default {
  insertOrder
}