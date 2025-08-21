import { injectable } from "tsyringe"
import type { HttpEndpoint } from "./httpEndpoint"
import type { Credenziali } from "../../../common/viewmodels/Credenziali"
import { ResultMapper } from "../../../common/ResultMapper"


type TokenResponse = {
    token: string
}


@injectable()
export class LoginEndpoint {

    constructor(private httpEndpoint: HttpEndpoint) { }

    public async login(credenziali: Credenziali) {
        return ResultMapper.from((await this.httpEndpoint.query<any>("graphql", `
            mutation{
                login(credenziali: {
                    username: "${credenziali.username}",
                    password: "${credenziali.password}"
                }) {token}
            }    
        `)))
        .map((v)=>v["login"] as TokenResponse)
    }
}