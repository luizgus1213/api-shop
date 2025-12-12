import express, {Request, Response} from 'express'
import {clientes, animais} from './database'
import Animal from './types/animal'

interface AnimalRequest extends Animal {
    cpf_dono: string
}

const port = 3000
const app = express()

app.use(express.json())  

//CONTROLLERS
const listarClientes = (req:Request, res: Response)=>{
    res.json(clientes)
}
    
const listaranimais = (req:Request, res: Response) => {
    res.json(animais)
}

const cadastrarcliente = (req: Request, res: Response) => {
    const corpo = req.body

    const cpfexistente = clientes.find(c => c.cpf === corpo.cpf)

    if (cpfexistente) {
        return res.status(400).json({ mensagem: "Já existe um cliente cadastrado com esse CPF." })
    }

    const novocliente = { ...corpo }
    clientes.push(novocliente)

    return res.status(400).json({ 
        mensagem: "Cliente cadastrado com sucesso",
        data: novocliente
    })
}

const cadastraranimal = (req:Request<{}, {}, AnimalRequest>, res:Response) => {
    const corpo_da_requisicao = req.body

    const existe_nome_animal = animais.find(a =>
        a.nome.toLowerCase() === corpo_da_requisicao.nome.toLowerCase()
    )

    const nome_animal_duplicado = animais.some(a =>
        a.nome.toLowerCase() === corpo_da_requisicao.nome.toLowerCase()
    )

    if(!corpo_da_requisicao.cpf_dono) 
        return res.status(400).json({messagem: "O cpf do dono do animal precisa ser informado"})

    const cliente = clientes.find(c => c.cpf === corpo_da_requisicao.cpf_dono)

    if(!cliente) 
        return res.status(400).json({messagem: "CPF informado não está cadstrado no sistema"})

    if (existe_nome_animal || nome_animal_duplicado) {
        return res.status(400).json({ mensagem: "Já existe um animal com esse nome." })
    }

    const novo_animal:Animal = {
        tipo: corpo_da_requisicao.tipo,
        nome: corpo_da_requisicao.nome,
        cor: corpo_da_requisicao.cor,
        idade: corpo_da_requisicao.idade, 
        dono: cliente,
        raça: corpo_da_requisicao.raça
    }

    animais.push(novo_animal)

    res.json({mensagem: "Animal cadastrado com sucesso", data: novo_animal})
}

//ROTAS
app.get('/clientes', listarClientes)

app.get('/animais', listaranimais)

app.post('/animais', cadastraranimal)

app.post("/clientes", cadastrarcliente)

/*
Create
Read
Update
Delete
*/

app.listen(port, ()=>console.log(`Servidor rodando na porta ${port}`))
