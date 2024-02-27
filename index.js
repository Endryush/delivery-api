import express from 'express'
import winston from 'winston'
import cors from 'cors'

// routes
// import ordersRouter from './routes/orders.routes.js'


// global json file to write and read items for learning purposes
global.filename = 'pedidos.json'
// global logger 
const { combine, timestamp, label, printf } = winston.format
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}]  ${level}: ${message}`
})
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'bank-api-logger.log' })
  ],
  format: combine(
    label({ label: 'my-delivery-api' }),
    timestamp(),
    myFormat
  )
})

const app = express()
app.use(cors())
app.use(express.json())

// routes
// app.use('/order', ordersRouter)


app.listen(3000, async ()=> {
  logger.info('Server is running on port 3000')
})