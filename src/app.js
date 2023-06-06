const validateUserObjectService = require('./services/validate-user-object.service');
const createPutItemObjectService = require('./services/create-put-item-object.service');
const putItemDynamoDbService = require('./services/put-item-dynamodb.service');

exports.lambdaHandler = async (event, context) => {

    const errors = validateUserObjectService.validateUserObject(JSON.parse(event.body));
    if (errors.length > 0)
        return errorResult(400, errors);

    const userPutItem = createPutItemObjectService.createUserPutItem(event.body);
    try {
        const resultPut = await putItemDynamoDbService.putUserOnDatabase(userPutItem);

        console.log(resultPut);
        return defaultResult(200, {
            'Mensagem': 'Usuário ' + userPutItem.email.S + ' criado com sucesso'
        });
    } catch (error) {
        if (error.code === 'ConditionalCheckFailedException') {

            return defaultResult(200, {
                'Mensagem': 'Usuário ' + userPutItem.email.S + ' criado com sucesso'
            });

        }
        return errorResult(500, error);
    }
}

function errorResult(statusCode, errors) {
    return defaultResult(statusCode, {
        errors: errors
    });
}

function defaultResult(statusCode, object) {
    return {
        'statusCode': statusCode,
        'body': JSON.stringify(object),
        'isBase64Encoded': false,
        'headers': {
            'Content-Type': 'application/json'
        }
    }
}