import { compareSync } from "bcrypt";
import { Result } from "../../../common/Result";


export class Utente{
    constructor(
        public id: Readonly<number>,
        public username: Readonly<string>, 
        private password: Readonly<string>,
    ){}


    public checkPassword(password: string): Result<Utente, string>{
        return compareSync(password, this.password) ? 
            {success: true, value: this} :
            {success: false, error: "Password non valida"}
    }
}