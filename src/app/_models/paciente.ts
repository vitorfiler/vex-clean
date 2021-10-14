export class Paciente {
    id: number;
    nome: string;
    medicoID: number;
    nomeMedico: string;
    cpf: string;
    dtPrescricao: string;
    telefone: string;
    observacao: string;
    ativo: boolean = true;
    endereco: Endereco
}
export class Endereco {
    id: number;
    logradouro: string;
    numero: string;
    bairro: string;
    complemento: string;
    cidade: string;
    estado: string;
    cep: string
}