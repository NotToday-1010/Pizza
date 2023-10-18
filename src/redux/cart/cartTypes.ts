export type CartItem = {
    title: string,
    type: string,
    size: number,
    price: number,
    id: string,
    imageUrl: string,
    count: number
}

export type ActionCartItemType = {
    id: string,
    type: string,
    size: number,
    price: number,
    count: number
}

export interface CartSliceState {
    totalPrice: number,
    pizzas: CartItem[],
    eachPizzaCount: Record<string, number>,
    // eachPizzaCount: { [key: number]: number }
    totalCount: number,
}