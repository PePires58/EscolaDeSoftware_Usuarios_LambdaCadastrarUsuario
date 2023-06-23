import { Erro } from "../models/erro";
import { Usuario } from "../models/usuario";

export class UsuarioValidacoes {

    ValidarUsuario(usuario: Usuario | null): Erro[] {
        let erros: Erro[] = [];

        if (!usuario || Object.keys(usuario).length === 0) {
            erros.push(new Erro('Objeto de usuário é obrigatório'));
        }
        else {
            if (!usuario.email)
                erros.push(new Erro('Email do usuário é obrigatório'));
            if (!usuario.nome)
                erros.push(new Erro('Nome do usuário é obrigatório'));
            if (!usuario.sobrenome)
                erros.push(new Erro('Sobrenome do usuário é obrigatório'));
            if (!usuario.cpf)
                erros.push(new Erro('CPF do usuário é obrigatório'));
            if (!usuario.senha)
                erros.push(new Erro('Senha do usuário é obrigatória'));
        }

        return erros;
    }
}

