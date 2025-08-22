import { sign, verify } from "jsonwebtoken"
import { Utente } from "../models/Utente"
import { Result } from "../../../common/Result"

export type JwtPayload = Readonly<{id: number, username: string}>
export type Token = {token: string}

const KEY = "awodajwaiodjoiedjieswfjewoifwjfiwer.e.fwefw0e9fiw40ef"

export const generateJwt = (utente: JwtPayload): Token =>
    ({
        token: sign({id: utente.id, username: utente.username}, KEY, {
            expiresIn: "10h"
        })
    })


export const validateToken = (token: string): Result<JwtPayload, string> => {
    try{
        return {
            success: true,
            value: verify(token, KEY) as JwtPayload
        }
    }
    catch(e){
        return {
            success: false,
            error: "Token non valido o scaduto"
        }
    }
}