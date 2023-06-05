const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.putUserOnDatabase = async function (userItem) {
    const params = {
        TableName: process.env.TableName,
        Item: userItem,
        ReturnConsumedCapacity: "TOTAL",
        ConditionExpression: "attribute_not_exists(email)"
    };

    return await dynamodb.putItem(params)
        .promise()
        .then((data) => {
            return data;
        });
}