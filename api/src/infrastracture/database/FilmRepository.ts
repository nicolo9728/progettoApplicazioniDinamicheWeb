import { injectable } from "tsyringe";
import { QueryParameters } from "../../../../common/viewmodels/QueryParamenters";
import { FilterToSqlQuery } from "../../common/ConvertQueryParametersToSql";
import { Film } from "../../models/Film";
import { Genere } from "../../models/Genere";
import { Language } from "../../models/Language";
import { SqlConnectionRental } from "./SqlConnectionRental";
import { RisultatoPaginato } from "../../../../common/viewmodels/RisultatoPaginato";

@injectable()
export class FilmRepository {
    constructor(
        private db: SqlConnectionRental,
        private queryBuilder: FilterToSqlQuery) { }

    public async getFilmsByQuery(query: QueryParameters): Promise<RisultatoPaginato<Film>> {
        const { sql, params } = this.queryBuilder
            .addAllFilters(query.where ?? [])
            .orderBy(query.sortBy ?? { campo: "title", asc: true })
            .build()
            
        const ris = await this.db.query(`
            SELECT 
                f.film_id,
                f.title,
                f.release_year,
                f.rating,
                f.rental_rate,
                c.category_id,
                c.name as genere_name,
                l.language_id,
                l.name as lingua_name
            FROM 
                film f
                JOIN film_category fc ON (f.film_id = fc.film_id)
                JOIN category c ON (c.category_id = fc.category_id)
                JOIN language l ON (f.language_id = l.language_id)
            ${sql}
            LIMIT 10
            OFFSET ${(query.page ?? 1 - 1) * 10}
        `, params)

        const tot = (await this.db.query("SELECT CEIL(COUNT(*) / 10.0) as tot FROM film", []))[0]["tot"]


        const datiRaggruppati: Map<number, Genere[]> = ris.reduce((last: Map<number, Genere[]>, current: any) => {
            last.get(current["film_id"])
                ? last.get(current["film_id"])?.push(new Genere(current["category_id"], current["genere_name"]))
                : last.set(current["film_id"], [new Genere(current["category_id"], current["genere_name"])])

            return last
        }, new Map<number, Genere[]>())

        return {
            paginaCorrente: query.page ?? 1,
            pagineTotali: tot,
            items: ris.map((f) => new Film(
                f["film_id"],
                f["title"],
                f["release_year"],
                f["rental_rate"],
                datiRaggruppati.get(f["film_id"])!,
                new Language(f["language_id"], f["lingua_name"]),
                f["rental_rate"]))
        }
    }
}