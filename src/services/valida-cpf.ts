export class ValidaCPF {
    private static readonly MULTIPLICADOR1: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    private static readonly MULTIPLICADOR2: number[] = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

    CpfEhValido(cpf: string): boolean {
        cpf = this.RemovePontos(cpf);

        if (cpf.length !== 11 || !/^\d{11}$/.test(cpf))
            return false;

        const digitos = cpf.split("").map(Number);

        if (this.DigitosSaoIguais(digitos))
            return false;

        // Valida o primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += digitos[i] * ValidaCPF.MULTIPLICADOR1[i];
        }
        let resto = soma % 11;
        let digitoVerificador = resto < 2 ? 0 : 11 - resto;
        if (digitoVerificador !== digitos[9]) {
            return false;
        }

        // Valida o segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += digitos[i] * ValidaCPF.MULTIPLICADOR2[i];
        }
        resto = soma % 11;
        digitoVerificador = resto < 2 ? 0 : 11 - resto;
        if (digitoVerificador !== digitos[10]) {
            return false;
        }

        return true;
    }

    private RemovePontos(cpf: string): string {
        return cpf.trim().replace(".", "").replace("-", "");
    }

    private DigitosSaoIguais(digitos: number[]) {
        return digitos.every((d) => d === digitos[0]);
    }
}