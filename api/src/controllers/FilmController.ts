import { injectable } from "tsyringe";
import { ActionResult } from "../infrastracture/graphql/ActionResult";
import { FilmRepository } from "../infrastracture/database/FilmRepository";
import { QueryParameters } from "../../../common/viewmodels/QueryParamenters";
import { Film } from "../models/Film";
import { FilmViewModel, GenereViewModel } from "../../../common/viewmodels/FilmViewModel";
import { RisultatoPaginato } from "../../../common/viewmodels/RisultatoPaginato";

@injectable()
export class FilmController{

    constructor(private filmRepository: FilmRepository){}
    
    public async getFilmsByQuery(query: QueryParameters): Promise<ActionResult<RisultatoPaginato<FilmViewModel>>>{
        const films = await this.filmRepository.getFilmsByQuery(query)
        console.log(films)
        return {
            type: "Ok",
            data: films
        }
    }
}