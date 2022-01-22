import { CreateTableInput, PutItemInput } from "aws-sdk/clients/dynamodb";

export const UserModel:CreateTableInput = {
  TableName: 'User',
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