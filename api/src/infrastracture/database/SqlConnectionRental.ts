import { Pool } from "pg";
import { SqlConnection } from "./SqlConnection";
import { injectable } from "tsyringe";

@injectable()
export class SqlConnectionRental extends SqlConnection{
    protected createConnection(): Pool {
        return new Pool({
            host: "localhost",
            user: "postgres",
            password: "1234",
            database: "rental"
        })
    }
    
}