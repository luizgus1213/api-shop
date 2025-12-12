import Cliente from "./cliente"

interface Animal {
    tipo:string
    raça:string
    cor:string
    idade:number
    dono:Cliente
    nome: string

}

export default Animal