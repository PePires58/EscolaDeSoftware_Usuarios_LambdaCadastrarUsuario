import { expect } from "chai";
import { ValidaEmail } from "../services/valida-email";

describe("Validando email - Testes", () => {

    it("Deve retornar true para um email válido", () => {
        const validador = new ValidaEmail();

        const emailsValidos = [
            "exemplo1@example.com",
            "exemplo2@example.com",
            "exemplo3@example.com",
        ];

        for (const email of emailsValidos) {
            expect(validador.EmailEhValido(email)).to.be.true;
        }
    });

    it("Deve retornar false para um email inválido", () => {
        const validador = new ValidaEmail();

        const emailsInvalidos = [
            "com",
            "exemplo2example.com",
            "example.com",
        ];

        for (const email of emailsInvalidos) {
            expect(validador.EmailEhValido(email)).to.be.false;
        }
    });
});
