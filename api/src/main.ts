import "reflect-metadata"
import express from "express"
import cors from "cors"
import { createHandler } from 'graphql-http/lib/use/express';
import { CredenzialiLogin, LoginController } from "./controllers/LoginController";
import { container } from "tsyringe";
import { buildSchema } from "graphql";
import { gestisciRichiestaAsync } from "./infrastracture/graphql/ActionResult";

const PORT = 5000

const app = express()

app.use(cors())

const schema = buildSchema(`
    type Token{
        token: String
    }

    type Query{
        hello: String
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
    login: async ({credenziali}: {credenziali: CredenzialiLogin}) => 
        gestisciRichiestaAsync(async ()=>await container.resolve(LoginController).login(credenziali)),
        
    hello: () => "world"
};

app.all("/graphql", createHandler({ schema, rootValue }))

app.listen(PORT, () => console.log(`In ascolto sulla porta ${PORT}`))