import { Pool } from "pg";

export abstract class SqlConnection{
    
    private pool: Pool

    constructor(){
        this.pool = this.createConnection()
    }


    protected abstract createConnection(): Pool


    public async query(query: string, params: any[]): Promise<any[]>{
        return (await this.pool.query(query, params)).rows
    }
    
}