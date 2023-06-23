import {
    GetQueueUrlCommand, GetQueueUrlCommandInput, SQSClient, SendMessageCommand, SendMessageCommandInput
} from "@aws-sdk/client-sqs";
import { Usuario } from "../models/usuario";


export class SQSService {

    private client: SQSClient;

    constructor() {
        this.client = new SQSClient({ apiVersion: '2012-11-05' })
    }


    async EnviarMensagem(usuario: Usuario): Promise<string> {

        const input: SendMessageCommandInput = {
            MessageBody: this.MontaCorpoMensagem(usuario),
            QueueUrl: await this.BuscaUrlFila()
        };

        const command: SendMessageCommand = new SendMessageCommand(input);

        let idMensagem = '';
        await this.client.send(command)
            .then((output) => {
                if (output.MessageId)
                    idMensagem = output.MessageId
            });

        return idMensagem;
    }

    private MontaCorpoMensagem(usuario: Usuario): string {
        return JSON.stringify({
            email: usuario.email,
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            identification: {
                type: 'CPF',
                number: usuario.cpf
            }
        });
    }

    private async BuscaUrlFila(): Promise<string> {
        const input: GetQueueUrlCommandInput = {
            QueueName: process.env.NomeFilaSqs
        };

        const command: GetQueueUrlCommand = new GetQueueUrlCommand(input);

        let urlFila = '';
        await this.client.send(command)
            .then((output) => {
                if (output.QueueUrl)
                    urlFila = output.QueueUrl;
            });

        return urlFila;
    }
}