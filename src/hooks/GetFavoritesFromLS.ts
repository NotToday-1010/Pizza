import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addManyFavorite, selectFavoriteID} from "../redux/favorite/favoriteSlice";

export const GetFavoritesFromLS = () => {
    const isSavedFav = useRef(false)
    const dispatch = useDispatch()
    const favoriteId = useSelector(selectFavoriteID)

    useEffect(() => {
        const savedFavorites = localStorage.getItem('favoritePizzas')

        if (savedFavorites != null && !isSavedFav.current) {
            const newFavorites: string[] = JSON.parse(savedFavorites)
            dispatch(addManyFavorite(newFavorites))
            isSavedFav.current = true
        } else if (isSavedFav.current || savedFavorites === null) {
            const favoriteIdJSON = JSON.stringify(favoriteId)
            localStorage.setItem('favoritePizzas', favoriteIdJSON)
        }
    }, [favoriteId])

    return 0
}