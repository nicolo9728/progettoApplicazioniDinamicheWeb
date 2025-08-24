import { Genere } from "./Genere";
import { Language } from "./Language";

export class Film{
    constructor(
        public id: Readonly<number>,
        public titolo: Readonly<string>, 
        public anno: Readonly<number>,
        public rating: Readonly<string>,
        public generi: Readonly<Genere[]>,
        public lingua: Language,
        public costo: Readonly<string>
    ){}
}