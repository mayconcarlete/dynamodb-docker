import { RepositoryError } from "@/errors/repository-error";
import { DynamoDBRepository, InsertInput } from "@/repository";
import { ClientConfiguration, CreateTableInput, PutItemInput } from "aws-sdk/clients/dynamodb";

export const ChatService:CreateTableInput = {
  TableName: 'Chat',
  KeySchema:[
    {
      AttributeName: 'Email',
      KeyType: 'HASH'
    }
  ],
  AttributeDefinitions:[
    {
      AttributeName: 'Email',
      AttributeType: 'S'
    }
  ],
  ProvisionedThroughput:{
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
}

export const UserInsert:PutItemInput = {
  TableName: 'User',
  Item:{
    Email: {
      S: 'maycon.carlete@gmail.com'
    }
  }
}

type Input = {
  tableName: string
}
interface CreateTable {
  createTable():Promise<boolean | RepositoryError>
}


interface Insert<T=any> {
  insert(input: T):Promise<boolean | RepositoryError>
}
export class User implements CreateTable{
  dynamoDBRepository: DynamoDBRepository
  constructor(
    clientConfig: ClientConfiguration,
    ){
      this.dynamoDBRepository = new DynamoDBRepository(clientConfig)
    }
  async createTable(): Promise<boolean | RepositoryError> {
    const UserModel:CreateTableInput = {
      TableName: 'User',
      KeySchema:[
        {
          AttributeName: 'PK',
          KeyType: 'HASH'
        }
      ],
      AttributeDefinitions:[
        {
          AttributeName: 'PK',
          AttributeType: 'S'
        },
        {
          AttributeName: 'Email',
          AttributeType: 'S'
        }
      ],
      ProvisionedThroughput:{
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      }
    }
    return await this.dynamoDBRepository.createTable(UserModel)
  }


}