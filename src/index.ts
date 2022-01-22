import './configs'
import { ClientConfiguration } from 'aws-sdk/clients/dynamodb'
import { DynamoDBRepository } from '@/repository'
import { UserModel } from '@/models'

const localConfig:ClientConfiguration = {
  apiVersion: '2012-08-10',
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'DUMMY_ID',
  secretAccessKey: 'DUMMY_KEY'
}
;
(
  async() => {
    const dynamoRepository = new DynamoDBRepository(localConfig)
    let response = true
    // const response = await dynamoRepository.createTable(UserModel)
    console.log(await dynamoRepository.listTables())
    console.log(response)
  }
)()
console.log('Hello world')