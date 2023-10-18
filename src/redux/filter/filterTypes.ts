export type SortType = {
    name: string,
    sortQuery: string,
    order: string
}

export interface FilterType {
    categoryID: number,
    sort: SortType,
    page: number,
}