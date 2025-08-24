export type LinguaViewModel = {
    id: number
    nome: string
}

export type GenereViewModel = {
    id: number
    nome: string
}


export type FilmViewModel = Readonly<{
    titolo: string
    anno: number
    rating: string
    lingua: LinguaViewModel
    generi: ReadonlyArray<GenereViewModel>
    costo: string
}>