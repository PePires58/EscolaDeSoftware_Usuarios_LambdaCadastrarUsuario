import { ValidaCPF } from './valida-cpf';
import { ValidaEmail } from './valida-email';
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
            else if (!new ValidaEmail().EmailEhValido(usuario.email))
                erros.push(new Erro('Email inválido'));
            if (!usuario.nome.trim())
                erros.push(new Erro('Nome do usuário é obrigatório'));
            else if (usuario.nome.length< 2)
                erros.push(new Erro('Nome do usuario dever ter ao menos 3 caracteres'));
            else if (usuario.nome.length > 50)
                erros.push(new Erro('Nome do usuário deve ter no máximo 50 caracteres'));
            if (!usuario.sobrenome)
                erros.push(new Erro('Sobrenome do usuário é obrigatório'));
                else if(usuario.sobrenome.length<3)
                erros.push(new Erro('Sobrenome do Usuário deve ter no minimo 3 caracteres'));
            else if (usuario.sobrenome.length > 100)
                erros.push(new Erro('Sobrenome do usuário deve ter no máximo 100 caracteres'));

            if (!usuario.cpf)
                erros.push(new Erro('CPF do usuário é obrigatório'));
            else if (new ValidaCPF().CpfEhValido(usuario.cpf))
                erros.push(new Erro('CPF inválido'));
            if (usuario.senha.trim())
                erros.push(new Erro('Senha do usuário é obrigatória'));
                else if(usuario.senha.length<4)
                erros.push(new Erro('Senha dever ter no minimo 4 caracteres'));
                else if(usuario.senha.length>255)
                erros.push(new Erro('Senha não deve ter mais que 255 caracteres'));
        }

        return erros;
    }
}

