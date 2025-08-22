import { Filter } from "../../../common/viewmodels/Filter"


export class FilterWrapper{
    constructor(private filter: Readonly<Filter>){}

    public get orderColumn() {return this.filter.orderColumn}
    public get titolo() {return this.filter.titolo}
    public get categoria() {return this.filter.categoria}
    public get pagina(){return this.filter.pagina}

    public hasOrderColumn(){
        return this.orderColumn != undefined
    }

    public hasCategoria(){
        return this.categoria != undefined
    }

    public hasTitolo(){
        return this.titolo != undefined
    }
}