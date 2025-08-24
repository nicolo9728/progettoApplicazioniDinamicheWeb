import { injectable } from "tsyringe";
import { FilterQuery, SortParameters } from "../../../common/viewmodels/QueryParamenters";

type SqlConverted = Readonly<{
    sql: string,
    params: any[]
}>

@injectable()
export class FilterToSqlQuery {
    private index: number = 1
    private where: string = ""
    private order: string = ""
    private params: any[] = []

    public addFilter(filter: FilterQuery) {
        if (filter != undefined)
            this.where = this.where == ""
                ? `WHERE ${filter.campo}=$${this.index++}`
                : `${this.where} AND ${filter.campo}=$${this.index++}`

        this.params.push(filter.valoreString ?? filter.valoreInt)
        
        return this
    }

    public addAllFilters(filter: FilterQuery[]){
        filter.forEach((f)=>this.addFilter(f))

        return this
    }

    public orderBy(order: SortParameters) {
        this.order = `ORDER BY $${this.index++} ${order.asc ? "ASC" : "DESC"}`
        this.params.push(order.campo)

        return this
    }

    public build(): SqlConverted {

        return {
            sql: `
                ${this.where}
                ${this.order}
            `,
            params: this.params
        }
    }

}