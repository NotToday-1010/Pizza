export type OnePizzaType = {
    "id": string,
    "imageUrl": string,
    "title": string,
    "types": number[],
    "sizes": number[],
    "price": number,
    "category": number,
    "rating": number,
    "compound": string
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface PizzaSliceState {
    allPizzas: OnePizzaType[],
    onePizza: OnePizzaType,
    status: Status
    fetchOneStatus: Status
}

export interface FetchParams {
    page: number,
    selectedSort: {
        name: string,
        sortQuery: string,
        order: string
    },
    searchValue: string,
    categoryID: number
}