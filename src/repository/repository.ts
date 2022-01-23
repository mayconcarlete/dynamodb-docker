import { RepositoryError } from '@/errors/repository-error'
import aws, { DynamoDB } from 'aws-sdk'
import { ClientConfiguration, CreateTableInput, TableNameList } from 'aws-sdk/clients/dynamodb'

export type InsertInput<T=any> = {
  tableName: string
  data: T
}
export class DynamoDBRepository {
  dynamoDB: DynamoDB

  constructor(
    private readonly clientConfig: ClientConfiguration
  ){
      this.dynamoDB = new aws.DynamoDB(clientConfig)
   }

   async listTables():Promise<string[] | RepositoryError>{
    try{
      const { TableNames } = await this.dynamoDB.listTables().promise()
      if(TableNames === undefined) return []
      return this.parseListTablesFromAwsTypeToStringArray(TableNames)
    } catch(e){
      if(e instanceof Error) return new RepositoryError(e)
      return new RepositoryError(new Error('Server Error'))
    }
  }

  parseListTablesFromAwsTypeToStringArray(tableNames: TableNameList): string[]{
     return tableNames!.map(tableName => tableName)
  }

  async createTable(table:CreateTableInput):Promise<boolean | RepositoryError>{
      try{
        await this.dynamoDB.createTable(table).promise()
        return true
      } catch(e){
        if(e instanceof Error) return new RepositoryError(e)
        throw new RepositoryError(new Error('Server Error'))
      }
    }

  async insert():Promise<boolean | RepositoryError>{
    try{
      const user =  {
        TableName: 'Chat',
        Item: {
          PK:{
            S: 'USER#rafael.srios@gmail.com',
          },
          SK: {
            S: 'PROFILE#rafael.srios@gmail.com'
          },
          Name: {
            S: 'Maycon Carlete'
          }
        }
      }
      const chat = {
        TableName: 'Chat',
        Item:{
          PK: {
            S:'CHAT#maycon.carlete@gmail.com#rafael.srios@gmail.com'
          },
          SK:{
            S: new Date().toISOString()
          }
        }
      }
      const message = {
        TableName: 'Chat',
        Item: {
          PK:{
            S: 'MESSAGE#'
          }
        }
      }
      await this.dynamoDB.putItem().promise()
      return true
    } catch(e){
      if(e instanceof Error) return new RepositoryError(e)
      return new RepositoryError(new Error('Server Error'))
    }
  }

  async get():Promise<any>{
    // const response = await this.dynamoDB.query({
    //   TableName: 'Chat',
    //   FilterExpression: `contains(CHAT#, :rafael.srios@gmail.com)`,
    //   ExpressionAttributeNames:{

    //   }
    // })
    // const response = await this.dynamoDB.getItem().promise()
    const response = await this.dynamoDB.scan({
      TableName: 'Chat',
      FilterExpression: 'contains(#n, :nname)',
      ExpressionAttributeNames:{
        "#n": "Name"
      },
      ExpressionAttributeValues:{
        ":nname":{
          S:"Maycon"
        }
      }
    }).promise()
    return response
  }
}