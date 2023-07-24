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

            const emailTrim = usuario.email.trim();
            if (!emailTrim)
                erros.push(new Erro('Email do usuário é obrigatório'));
            else if (!new ValidaEmail().EmailEhValido(emailTrim))
                erros.push(new Erro('Email inválido'));

            const nomeTrim = usuario.nome.trim();
            if (!nomeTrim)
                erros.push(new Erro('Nome do usuário é obrigatório'));
            else if (nomeTrim.length < 3)
                erros.push(new Erro('Nome do usuário deve ter ao menos 3 caracteres'));
            else if (nomeTrim.length > 50)
                erros.push(new Erro('Nome do usuário deve ter no máximo 50 caracteres'));

            const sobrenomeTrim = usuario.sobrenome.trim();
            if (!sobrenomeTrim)
                erros.push(new Erro('Sobrenome do usuário é obrigatório'));
            else if (sobrenomeTrim.length < 3)
                erros.push(new Erro('Sobrenome do Usuário deve ter no minimo 3 caracteres'));
            else if (sobrenomeTrim.length > 100)
                erros.push(new Erro('Sobrenome do usuário deve ter no máximo 100 caracteres'))

            if (!usuario.cpf.trim())
                erros.push(new Erro('CPF do usuário é obrigatório'));
            else if (!new ValidaCPF().CpfEhValido(usuario.cpf))
                erros.push(new Erro('CPF inválido'));

            const senhaTrim = usuario.senha.trim();
            if (!senhaTrim)
                erros.push(new Erro('Senha do usuário é obrigatória'));
            else if (senhaTrim.length < 4)
                erros.push(new Erro('Senha dever ter no minimo 4 caracteres'));
            else if (senhaTrim.length > 255)
                erros.push(new Erro('Senha não deve ter mais que 255 caracteres'));
        }

        return erros;
    }
}

