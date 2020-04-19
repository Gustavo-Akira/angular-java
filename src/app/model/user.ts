import { Telefone } from './telefone';
import { Profissao } from './profissao';

export class User {

    id: number;
    login: string;
    senha: string;
    nome: string;
    role: string;
    cpf: string;
    telefones: Array<Telefone>;
    dataNascimento: string;
    profissao: Profissao = new Profissao();
    salario: number;
}
