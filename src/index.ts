import './configs'
import { ClientConfiguration, CreateTableInput } from 'aws-sdk/clients/dynamodb'
import { DynamoDBRepository } from '@/repository'
import { ChatService, UserInsert } from '@/models'

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
    const UserModel:CreateTableInput = {
      TableName: 'Chat',
      KeySchema:[
        {
          AttributeName: 'PK',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'SK',
          KeyType: 'RANGE'
        }
      ],
      AttributeDefinitions:[
        {
          AttributeName: 'PK',
          AttributeType: 'S'
        },
        {
          AttributeName: 'SK',
          AttributeType: 'S'
        }
      ],
      ProvisionedThroughput:{
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      }
    }
    const dynamoRepository = new DynamoDBRepository(localConfig)
    // const response = await dynamoRepository.createTable(UserModel)
    console.log(await dynamoRepository.listTables())
    // const response = await dynamoRepository.insert()
    const response = await dynamoRepository.get()
    console.log(JSON.stringify(response))
    console.log(new Date().toISOString())
  }
)()
console.log('Hello world')