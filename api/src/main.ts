import "reflect-metadata"
import express, { Request } from "express"
import cors from "cors"
import { createHandler } from 'graphql-http/lib/use/express';
import { CredenzialiLogin, LoginController } from "./controllers/LoginController";
import { container } from "tsyringe";
import { buildSchema } from "graphql";
import { gestisciRichiestaAsync, gestisciRichiestaAutenticataAsync } from "./infrastracture/graphql/ActionResult";
import { FilmController } from "./controllers/FilmController";
import { QueryParameters } from "../../common/viewmodels/QueryParamenters";
import { Film } from "./models/Film";
import { FilmViewModel } from "../../common/viewmodels/FilmViewModel";
import { RisultatoPaginato } from "../../common/viewmodels/RisultatoPaginato";


const PORT = 5000

const app = express()

app.use(cors())

const schema = buildSchema(`
    type Token{
        token: String
    }
    
    input FilterParameter{
        campo: String
        valoreString: String
        valoreInt: Int
    }

    input SortParameter{
        campo: String
        asc: Boolean
    }

    input QueryParameters{
        where: [FilterParameter]
        sortBy: SortParameter
        page: Int
    }
    
    type RisultatoPaginatoFilm{
        paginaCorrente: Int
        pagineTotali: Int
        items: [Film]
    }

    type Query{
        hello: String
        films(arg: QueryParameters): RisultatoPaginatoFilm
    }

    type Genere{
        id: Int
        nome: String
    }

    type Lingua{
        id: Int
        nome: String
    }

    type Film{
        titolo: String
        anno: Int
        rating: String
        generi: [Genere],
        lingua: Lingua
        costo: String
    }
    
    type Filter{
        orderColumn: String
        titolo: String
        categoria: String
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
        gestisciRichiestaAutenticataAsync<string>(async (auth)=>({type: "Ok", data: `ciao ${auth.username}`}), req), 
    
    films: ({arg}: {arg: QueryParameters}, {req}: {req: Request}) =>
        gestisciRichiestaAutenticataAsync<RisultatoPaginato<FilmViewModel>>(
            (_) => container.resolve(FilmController).getFilmsByQuery(arg), req)
};

app.all("/graphql", createHandler({ 
    schema: schema, 
    rootValue: rootValue,
    context: (req, _)=>({ req })
}))

app.listen(PORT, () => console.log(`In ascolto sulla porta ${PORT}`))
