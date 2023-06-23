import { describe } from 'mocha';
import { expect } from 'chai';

import { Erro } from "../models/erro";
import { Usuario } from "../models/usuario";
import { UsuarioValidacoes } from "../services/usuario-validacoes";

describe('Validate user Object Service tests', function () {
    it('Should have an error "Objeto de usuário é obrigatório"', function () {

        const errors: Erro[] = new UsuarioValidacoes().ValidarUsuario(null);

        expect(errors.length).greaterThan(0);
        expect(errors.find(c => c.erro === "Objeto de usuário é obrigatório"))
            .not.null;
    });

    it('Should have an error "Email do usuário é obrigatório"', function () {
        const userInput: Usuario = new Usuario();
        userInput.email = '';

        const errors: Erro[] = new UsuarioValidacoes().ValidarUsuario(userInput);

        expect(errors.length).greaterThan(0);
        expect(errors.find(c => c.erro === "Email do usuário é obrigatório"))
            .not.null;

    });

    it('Should have an error "Nome do usuário é obrigatório"', function () {
        const userInput: Usuario = new Usuario();
        userInput.email = 'pedrao@gmail.com'


        const errors: Erro[] = new UsuarioValidacoes().ValidarUsuario(userInput);

        expect(errors.length).greaterThan(0);
        expect(errors.find(c => c.erro === "Nome do usuário é obrigatório"))
            .not.null;
    });

    it('Should have an error "Sobrenome do usuário é obrigatório"', function () {
        const userInput: Usuario = new Usuario();
        userInput.email = 'pedrao@gmail.com';
        userInput.nome = 'pedrao'


        const errors: Erro[] = new UsuarioValidacoes().ValidarUsuario(userInput);

        expect(errors.length).greaterThan(0);
        expect(errors.find(c => c.erro === "Sobrenome do usuário é obrigatório"))
            .not.null;
    });

    it('Should have an error "CPF do usuário é obrigatório"', function () {
        const userInput: Usuario = {
            email: 'pedrao@gmail.com',
            nome: 'pedrao',
            sobrenome: 'pires',
            cpf: '',
            senha: ''
        }

        const errors: Erro[] = new UsuarioValidacoes().ValidarUsuario(userInput);

        expect(errors.length).greaterThan(0);
        expect(errors.find(c => c.erro === "CPF do usuário é obrigatório"))
            .not.null;
    });

    it('Should have an error "Senha do usuário é obrigatória"', function () {
        const userInput: Usuario = {
            email: 'pedrao@gmail.com',
            nome: 'pedrao',
            sobrenome: 'pires',
            cpf: '11122233311',
            senha: ''
        }

        const errors: Erro[] = new UsuarioValidacoes().ValidarUsuario(userInput);

        expect(errors.length).greaterThan(0);
        expect(errors.find(c => c.erro === "Senha do usuário é obrigatória"))
            .not.null;
    });

    it('Should not have errors', function () {
        const userInput: Usuario = {
            email: 'pedrao@gmail.com',
            nome: 'pedrao',
            sobrenome: 'pires',
            cpf: '52998224725',
            senha: 'suasenha'
        }

        const errors: Erro[] = new UsuarioValidacoes().ValidarUsuario(userInput);

        expect(errors.length).equal(0);
    });
});