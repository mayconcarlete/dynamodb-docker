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
      await this.dynamoDB.putItem(
        {
          TableName: 'Chat',
          Item: {
            PK:{
              S: 'USER#maycon.carlete@gmail.com',
            },
            SK: {
              S: 'PROFILE#maycon.carlete@gmail.com'
            },
            Name: {
              S: 'Maycon Carlete'
            }
          }
        }
      ).promise()
      return true
    } catch(e){
      if(e instanceof Error) return new RepositoryError(e)
      return new RepositoryError(new Error('Server Error'))
    }
  }

  async get(email:string):Promise<any>{
    const response = await this.dynamoDB.getItem({
      TableName:'User',
      Key:{
        Email:{
          S: email
        }
      }
    }).promise()
    return response
  }
}