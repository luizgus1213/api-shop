interface Endereco{
    país:string
    estado:string
    cep:string
    cidade:string
    bairro:string
    numero_da_casa:string
    bloco?:string
    ponto_referencia:string
}



interface Cliente{
    nome:string
    idade:number
    telefone:string
    cpf:string    
    endereco:Endereco    
}


interface Animal {
    tipo:string
    raça:string
    cor:string
    idade:number
    dono:Cliente

}

const luiz:Cliente = {
    cpf: "443434543",
    endereco: {
        bairro:"centro",
        cep:"3548000",
        cidade:"Dionísio",
        estado:"MG",
        numero_da_casa:"184",
        país: "Brasil",
        ponto_referencia:"em frente a padaria"
    },
    idade:15,
    nome:"Luiz Gustavo",
    telefone:"319988980032"
}

const cachorro:Animal = {
    tipo:"cachorro",
    raça:"bodercollen",
    cor:"marrom",
    idade:13,
    dono:luiz

}