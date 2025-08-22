import { SqlConnectionRental } from "./SqlConnectionRental";

export class FilmRepository{
    constructor(private sql: SqlConnectionRental){}
}