import { expect } from 'chai';
import { describe, it } from 'mocha';
import { ValidaCPF } from '../services/valida-cpf';


describe('Testes de validação de CPF', () => {
    it('Deve retornar true para CPFs válidos', () => {
        const validador = new ValidaCPF();

        const cpfsValidos = [
            "52998224725",
        ];

        cpfsValidos.forEach(cpf => {
            const resultado = validador.CpfEhValido(cpf);
            expect(resultado).to.be.true;
        });
    });

    it('Deve retornar false para CPFs inválidos', () => {
        const validador = new ValidaCPF();

        const cpfsInvalidos = [
            '11111111111',
            '22222222222',
            '33333333333',
            '12342029382'
        ];

        cpfsInvalidos.forEach(cpf => {
            const resultado = validador.CpfEhValido(cpf);
            expect(resultado).to.be.false;
        });
    });
});
