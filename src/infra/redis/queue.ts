import { createClient } from 'redis'


const client = createClient()

client.on('error', err => console.log('deu erro: ', err))
client.on('connect', data => console.log('tudo certo: ', data))
client.on('ready', data => console.log('ready: ', data))

export { client }
