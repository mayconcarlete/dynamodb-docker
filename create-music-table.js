const AWS = require('aws-sdk')

const config = {
    'endpoint': 'http://localhost:8000',
    'region': 'us-east-1',

}


const dynamodb = new AWS.DynamoDB(config)


const params = {
    TableName: "Music",
    AttributeDefinitions: [
        {
            AttributeName: "Artist",
            AttributeType: "S"
        },
        {
            AttributeName: "SongTitle",
            AttributeType: "S"
        }
    ],
    KeySchema: [
        {
            AttributeName: "Artist",
            KeyType: "HASH"
        },
        {
            AttributeName: "SongTitle",
            KeyType: "RANGE"
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    },
}

dynamodb.createTable(params, (err, data) => {
    if(err){
        console.log(`Something goes wrong`)
        console.log(err)
    }
    else{
        console.log(data)
    }
})

const params2 = {
    TableName: 'Music',
    Item: {
        "Artist": "Maycon",
        "SongTitle": "Maycon 2021"
    }
}

// dynamodb.putItem(params2, (err, data) => {
//     if(err) console.log(err)
//     console.log(data)
// })

// const getTest = {
//     TableName = 'Music',
//     Key: {
//         "Artist": "Maykerops"
//     }
// }
// dynamodb.getItem(params2,(err, data) => {
//     if(err){
//         console.log(err)
//     }
//     console.log(data)
// })

// dynamodb.query(params2, (err, data) => {
//     if(err){
//         console.log(err)
//     }
//     console.log(data)
// })

dynamodb.listTables({}, (err, data) => {
    if(err){
        console.log(err)
    }
    console.log(data)
})