
export type Rating = string
export type Genere = string
export type Lingua = string
export type Prezzo = string

export class Film{
    constructor(
        public id: Readonly<number>,
        public titolo: Readonly<string>, 
        public anno: Readonly<number>,
        public rating: Readonly<Rating>,
        public genere: Readonly<Genere>,
        public lingua: Readonly<Lingua>,
        public costo: Readonly<Prezzo>
    ){}
}