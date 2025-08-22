import { Pool } from "pg";
import { SqlConnection } from "./SqlConnection";
import { injectable } from "tsyringe";

@injectable()
export class SqlConnectionUser extends SqlConnection{
    protected createConnection(): Pool {
        return new Pool({
            host: "localhost",
            user: "nicolo9728",
            password: "1234",
            database: "rentalusers"
        })
    }

}