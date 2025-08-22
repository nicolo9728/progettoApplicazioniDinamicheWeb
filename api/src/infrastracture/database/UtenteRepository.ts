import { injectable } from "tsyringe";
import { SqlConnectionUser } from "./SqlConnectionUser";
import { Utente } from "../../models/Utente";
import { Result } from "../../../../common/Result";

@injectable()
export class UtenteRepository {
    constructor(
        private sql: SqlConnectionUser
    ) { }


    public async getUserByUsername(username: string): Promise<Result<Utente, string>> {
        const ris = await this.sql.query("SELECT * FROM utente WHERE username=$1", [username])
        return ris.length > 0
            ? {success: true, value: new Utente(ris[0]["id"], ris[0]["username"], ris[0]["password"])}
            : {success: false, error: "Username non trovato"}
    }
}