export type RisultatoPaginato<T> = {
    paginaCorrente: number
    pagineTotali: number
    items: T[]
}