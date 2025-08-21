import { inject, injectable } from "tsyringe"
import { ErrorMessage, HttpEndpoint } from "./httpEndpoint"
import { Credenziali } from "../../../common/viewmodels/Credenziali"
import { ResultMapper } from "../../../common/ResultMapper"
import { Result } from "../../../common/Result"


type TokenResponse = {
    token: string
}


@injectable()
export class LoginEndpoint {

    constructor(@inject(HttpEndpoint) private httpEndpoint: HttpEndpoint) { }

    private setToken(token: TokenResponse): Result<undefined, ErrorMessage[]>{
        sessionStorage.setItem("token", token.token)
        return {success: true, value: undefined}
    }

    public async login(credenziali: Credenziali) {
        return ResultMapper.from((await this.httpEndpoint.query("graphql", `
            mutation{
                login(credenziali: {
                    username: "${credenziali.username}",
                    password: "${credenziali.password}"
                }) {token}
            }    
        `)))
        .map((v)=>v["login"] as TokenResponse)
        .bind((t)=>this.setToken(t))
        .result
    }
}