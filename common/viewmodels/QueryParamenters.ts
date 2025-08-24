export type FilterQuery= {
    campo: string 
    valoreString: string
    valoreInt: number
}

export type SortParameters = {
    campo: string
    asc: boolean
}

export type QueryParameters = {
    where: FilterQuery[]
    sortBy: SortParameters
    page: number | undefined
}