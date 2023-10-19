import {selectCartState, setCartState} from "../redux/cart/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {CartSliceState} from "../redux/cart/cartTypes";


export const GetPizzasFromLS = () => {
    const isSaved = useRef(false)
    const isMounted = useRef(false)
    const dispatch = useDispatch()
    const cartState = useSelector(selectCartState)

    useEffect(() => {
        const savedPizzas = localStorage.getItem('cartState')
        if (savedPizzas != null && !isSaved.current) {
            const newCartState: CartSliceState = JSON.parse(savedPizzas)
            dispatch(setCartState(newCartState))
            isSaved.current = true
        } else if (isSaved.current && !isMounted.current) {
            isMounted.current = true
        } else if (isMounted.current || savedPizzas === null) {
            const cartItemsJSON = JSON.stringify(cartState)
            localStorage.setItem('cartState', cartItemsJSON)
        }

    }, [cartState])

    return 0
}
