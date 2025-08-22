import { Request } from "express"
import { ResultMapper } from "../../../../common/ResultMapper"
import { JwtPayload, validateToken } from "../../auth/JwtManager"

export type ActionResult<T> =
    { type: "Ok", data: T } |
    { type: "Failed", errore: string }


export const gestisciRichiestaAsync = async <T>(richiesta: () => Promise<ActionResult<T>>) => {
    const ris = await richiesta()
    switch (ris.type) {
        case "Ok": return ris.data
        case "Failed": throw new Error(ris.errore)
    }
}

export const gestisciRichiestaAutenticataAsync =
    async <T>(richiesta: (auth: JwtPayload) => Promise<ActionResult<T>>, req: Request): Promise<T> =>
        await ResultMapper
            .from(validateToken(req.headers["authorization"] ?? ""))
            .mapAsync((t)=>richiesta(t))
            .then((r)=>r.match<T>(
                (v)=>{
                    switch(v.type){
                        case "Ok": return v.data
                        case "Failed": throw new Error(v.errore)
                    }
                }, 
                (e)=>{throw new Error(e)}
            ))

