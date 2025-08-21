import { injectable } from "tsyringe";
import { UtenteRepository } from "../infrastracture/UtenteRepository";
import { sign } from "jsonwebtoken";
import { Utente } from "../models/Utente";
import { generateJwt } from "../auth/JwtManager";
import { Result, ResultMapper } from "../../../common/Result";
import { Token } from "../../../common/viewmodels/Token";

export type CredenzialiLogin = {username: string, password: string}


@injectable()
export class LoginController{
    constructor(
        private utenteRepository: UtenteRepository
    ){}


    public async login(credenziali: CredenzialiLogin){
        return ResultMapper.from(await this.utenteRepository.getUserByUsername(credenziali.username))
                .bind((u)=>u.checkPassword(credenziali.password))
                .bind((u)=>this.generateToken(u))
                .match((token) => token, (e)=> {throw new Error(e)});
    }

    private generateToken(utente: Utente): Result<Token, string>{
        try{
            const token = generateJwt({username: utente.username, id: utente.idCustomer})
            return {
                success: true,
                value: {
                    token: token
                }
            }
        }
        catch(e){
            return {
                success: false,
                error: "Errore di generazione del token"
            }
        }
    }
}