import { sign, verify } from "jsonwebtoken"
import { Utente } from "../models/Utente"

export type JwtPayload = Readonly<{id: number, username: string}>

const KEY = "awodajwaiodjoiedjieswfjewoifwjfiwer.e.fwefw0e9fiw40ef"

export const generateJwt = (utente: JwtPayload) =>
    sign(utente, KEY, {
        expiresIn: "10h"
    })


export const validateToken = (token: string) => 
    verify(token, KEY) as JwtPayload