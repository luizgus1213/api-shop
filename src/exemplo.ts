interface Carro{
    placa: string;
    modelo: string;
    fabricante: {
        nome: string;
        ano_fundacao: number
    }
    preco: number
}


const carro:Carro = {
	placa: "ABC2230",
	modelo: "Corola Xei Automático",
	fabricante: {
        nome: "Toyota",
        ano_fundacao: 1920
    },
	preco: 120000
}


const funcao = (nome:string)=>{
    console.log(`Aoba ${nome}`)
}


const soma = (n1:number, n2:number) =>{
console.log(n1 + n2)
}

function mostra_dados_carro(veiculo:Carro){
    console.log("IMPRIMINDO FICHA DO CARRO")
    console.log(`O modelo é ${veiculo.modelo}`)
    console.log(`O fabricante é ${veiculo.fabricante.nome} fundada em ${veiculo.fabricante.ano_fundacao}`)
    console.log(`A placa é ${veiculo.placa}`)
    console.log(`A preço é ${veiculo.preco}`)
}


mostra_dados_carro(carro)