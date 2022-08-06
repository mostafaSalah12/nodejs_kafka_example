const { Kafka } = require('kafkajs')
const express = require('express')
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json())
const products = [
  { id: 1, name: 'Keyboard', price: 200, qty: 10 },
  { id: 2, name: 'Mouse', price: 100, qty: 20 },
  { id: 3, name: 'Monitor', price: 300, qty: 30 },
  { id: 4, name: 'CPU', price: 500,   qty: 40 },
  { id: 5, name: 'GPU', price: 700, qty: 50 },
  { id: 6, name: 'RAM', price: 100, qty: 60 },
  { id: 8, name: 'Case', price: 300, qty: 70 },
  { id: 9, name: 'Power Supply', price: 500, qty: 80 },
  { id: 10, name: 'Motherboard', price: 700, qty: 90 },
  { id: 12, name: 'Hard Drive', price: 200, qty: 100 },
]

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [process.env.KAFKA_BROKER_URLS],
})

console.log("------------------------------------------------------")
console.log(process.env.HIGH_WATER_MARK)
console.log("------------------------------------------------------")
const consumer = kafka.consumer({ groupId: 'test-group11' })

const run = async ()=> {
  await consumer.connect()
  await consumer.subscribe({ topic: 'products' })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({ topic, partition, message })
    }

}, 1000)

}

run().catch(console.error)

app.listen(3000, ()=> {
  console.log('listening on port 3000')
}
)