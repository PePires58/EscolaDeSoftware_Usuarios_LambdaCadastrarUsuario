
import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';

import { Usuario } from './models/usuario';
import { Erro } from './models/erro';

import { UsuarioValidacoes } from './services/usuario-validacoes';
import { DynamoDbService } from './services/dynamodb';
import { SQSService } from './services/sqs';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';

export const lambdaHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    let erros: Erro[] = [];
    let usuario: Usuario;

    try {
        usuario = JSON.parse(event.body || '');
    }
    catch {
        usuario = new Usuario();
    }

    erros = new UsuarioValidacoes().ValidarUsuario(usuario);
    if (erros.length > 0)
        return errorResult(400, erros);

    try {

        await new DynamoDbService().AdicionarUsuario(usuario);
        await new SQSService().EnviarMensagem(usuario);

        return defaultResult(200, {
            'Mensagem': 'Usuário ' + usuario.email + ' criado com sucesso'
        })

    }
    catch (error) {
        if (error instanceof ConditionalCheckFailedException) {
            console.log(`Usuário ${usuario.email} já existe`);
            return defaultResult(200, {
                'Mensagem': 'Usuário ' + usuario.email + ' criado com sucesso'
            });
        }

        throw error;
    }
}

function errorResult(statusCode: number, erros: Erro[]) {
    return defaultResult(statusCode, {
        erros: erros
    });
}

function defaultResult(statusCode: number, object: object) {
    return {
        'statusCode': statusCode,
        'body': JSON.stringify(object),
        'isBase64Encoded': false,
        'headers': {
            'Content-Type': 'application/json'
        }
    }
}