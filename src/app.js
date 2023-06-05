const validateUserObjectService = require('./services/validate-user-object.service');
const createPutItemObjectService = require('./services/create-put-item-object.service');
const putItemDynamoDbService = require('./services/put-item-dynamodb.service');

exports.lambdaHandler = async (event, context) => {

    try {
        const errors = validateUserObjectService.validateUserObject(event.body);
        if (errors.length > 0) {
            return errorResult(400, errors);
        }
        else {
            const userPutItem = createPutItemObjectService.createUserPutItem(event.body);
            const resultPut = await putItemDynamoDbService.putUserOnDatabase(userPutItem);

            console.log(resultPut);
            return defaultResult({
                'Mensagem': 'Usuário ' + userPutItem.email.S + ' criado com sucesso'
            });

        }

    } catch (error) {
        console.log(typeof error);
        if (typeof error === ConditionalCheckFailedException) {

            return defaultResult({
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