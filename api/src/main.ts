import "reflect-metadata"
import express, { Request } from "express"
import cors from "cors"
import { createHandler } from 'graphql-http/lib/use/express';
import { CredenzialiLogin, LoginController } from "./controllers/LoginController";
import { container } from "tsyringe";
import { buildSchema } from "graphql";
import { gestisciRichiestaAsync, gestisciRichiestaAutenticataAsync } from "./infrastracture/graphql/ActionResult";


const PORT = 5000

const app = express()

app.use(cors())

const schema = buildSchema(`
    type Token{
        token: String
    }

    type Query{
        hello: String
        films: Film[]
    }

    type Film{
        titolo: String
        anno: Int
        rating: String
        genere: String
        lingua: String
        costo: String
    }
    
    type Filter{
        orderColumn: string?
        titolo: string?
        categoria: string?
    }
    
    input Credenziali{
        username: String,
        password: String
    }

    type Mutation{
        login(credenziali: Credenziali): Token
    }
`)



const rootValue = {
    login: async ({credenziali}: {credenziali: CredenzialiLogin}, req: Request) => 
        gestisciRichiestaAsync(async ()=>await container.resolve(LoginController).login(credenziali)),
        
    hello: (_: any,  {req}: {req: Request}) => 
        gestisciRichiestaAutenticataAsync<string>(async (auth)=>({type: "Ok", data: `ciao ${auth.username}`}), req) 
    
};

app.all("/graphql", createHandler({ 
    schema: schema, 
    rootValue: rootValue,
    context: (req, _)=>({ req })
}))

app.listen(PORT, () => console.log(`In ascolto sulla porta ${PORT}`))