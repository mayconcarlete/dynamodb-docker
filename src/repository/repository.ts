import aws, { DynamoDB } from 'aws-sdk'
import { ClientConfiguration, CreateTableInput, TableNameList } from 'aws-sdk/clients/dynamodb'

export class DynamoDBRepository {
  dynamoDB: DynamoDB

  constructor(
    private readonly clientConfig: ClientConfiguration
  ){
      this.dynamoDB = new aws.DynamoDB(clientConfig)
   }

   async listTables():Promise<string[] | Error>{
    try{
      const { TableNames } = await this.dynamoDB.listTables().promise()
      if(TableNames === undefined) return []
      return this.parseListTablesFromAwsTypeToStringArray(TableNames)
    } catch(e){
      console.log(e)
      return new Error()
    }
  }

  parseListTablesFromAwsTypeToStringArray(tableNames: TableNameList): string[]{
     return tableNames!.map(tableName => tableName)
  }

  async createTable(table:CreateTableInput):Promise<boolean>{
      try{
        await this.dynamoDB.createTable(table).promise()
        return true
      } catch(e){
        console.log(e)
        return false
      }
    }
}