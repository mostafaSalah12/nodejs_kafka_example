const { Kafka } = require('kafkajs')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())



const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [process.env.KAFKA_BROKER_URLS],
})

const producer = kafka.producer()

const run = async ()=>{

await producer.send({
  topic: 'test_topic111',
  
  messages: [
    { key: 'thekey', value: 'Hello KafkaJS user!' }
  ],
})
}

const orders = []

app.post('/orders', async(req, res)=>{
  console.log("------------------------------------------------------")
console.log(process.env.HIGH_WATER_MARK)
console.log("------------------------------------------------------")
  console.log("------------------------------------------------------")
console.log(process.env.KAFKA_BROKER_URLS)
console.log("------------------------------------------------------")
  const {order} = req.body
  try{
    orders.push(order)
  await producer.connect()
  await producer.send({
    topic: 'products',
    messages: [
      { value: order }
    ],
  })
}catch(e){
  console.log(e)
}
  res.send('order sent')
})

app.get('/orders', async(req, res)=>{
  res.send(orders)
})




app.listen(3001, ()=>{
  console.log('listening on port 3001')
} )

// on close of the application, disconnect the producer
process.on('SIGINT', async ()=>{
  await producer.disconnect()
  process.exit(0)
})