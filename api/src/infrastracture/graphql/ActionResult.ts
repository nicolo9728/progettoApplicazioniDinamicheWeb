export type ActionResult<T> = 
    {type: "Ok", data: T} |
    {type: "Failed", errore: string}


export const gestisciRichiesta = <T>(richiesta: ()=>ActionResult<T>) =>{
    const ris = richiesta()
    switch(ris.type){
        case "Ok": return ris.data
        case "Failed": throw new Error(ris.errore)
    }
}


export const gestisciRichiestaAsync = async <T>(richiesta: ()=>Promise<ActionResult<T>>) =>{
    const ris = await richiesta()
    switch(ris.type){
        case "Ok": return ris.data
        case "Failed": throw new Error(ris.errore)
    }
}

