import './src/configs'
import aws from 'aws-sdk'
import DynamoDB, { CreateTableInput, CreateTableOutput } from 'aws-sdk/clients/dynamodb'



class DynamoModel {
  constructor(
     private readonly dynamoDb:DynamoDB = new aws.DynamoDB(
       {
          apiVersion: '2012-08-10',
          region: 'us-east-1',
          endpoint: 'http://localhost:8000'
        }
      )
  ){}


  async createTable(tableData: CreateTableInput){
    try{
      const result = await this.dynamoDb.createTable(tableData).promise()
      console.log(result)
      return result
    } catch(e) {
      console.log('Deu erro aqui')
      console.log(e)
    }
  }

  async listTables(){
    const tables = await this.dynamoDb.listTables().promise()
    return tables
  }
}

const tableData:CreateTableInput = {
  TableName:'Meu test',
  AttributeDefinitions:[
    {
      AttributeName: 'Artiist',
      AttributeType: 'S'
    },
    {
      AttributeName: 'SongTitle',
      AttributeType: 'S'
    }
  ],
  KeySchema:[
    {
      AttributeName: 'Artist',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'SongTitle',
      KeyType: 'RANGE'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
}

const dynamoRepository = new DynamoModel()
// dynamoRepository.listTables().then(console.log)

console.log('Hello world')