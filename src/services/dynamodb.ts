import {
    AttributeValue, DynamoDBClient, PutItemCommand, PutItemCommandInput, PutItemCommandOutput
} from "@aws-sdk/client-dynamodb";
import { Usuario } from "../models/usuario";

export class DynamoDbService {

    constructor() {
        this.client = new DynamoDBClient({ apiVersion: '2012-08-10' });
    }

    private client: DynamoDBClient;

    async AdicionarUsuario(usuario: Usuario): Promise<PutItemCommandOutput> {

        const input: PutItemCommandInput = {
            TableName: process.env.TableName || '',
            Item: this.CriarMapeamentoItem(usuario),
            ReturnConsumedCapacity: "TOTAL",
            ConditionExpression: "attribute_not_exists(email)"
        };

        const command: PutItemCommand = new PutItemCommand(input);

        return await this.client.send(command);
    }

    private CriarMapeamentoItem(usuario: Usuario): Record<string, AttributeValue> {
        return {
            "email": {
                S: usuario.email
            },
            "nome": {
                S: usuario.nome
            },
            "sobrenome": {
                S: usuario.sobrenome
            },
            "cpf": {
                S: usuario.cpf
            },
            "senha": {
                S: usuario.senha
            }
        }
    }

}