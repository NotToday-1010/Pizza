import React, {useEffect} from 'react';
import {Status} from "../redux/pizzas/pizzasTypes";
import {Link} from "react-router-dom";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import PizzaBlock, {PizzaBlockProps} from "../components/PizzaBlock/PizzaBlock";
import {useSelector} from "react-redux";
import {selectFavoriteID, selectFavoriteStatus, selectFavPizzas} from "../redux/favorite/favoriteSlice";
import {fetchAllPizzas} from "../redux/favorite/asyncActions";
import {useAppDispatch} from "../redux/store";

const FavoritePage = () => {
    const status = useSelector(selectFavoriteStatus)
    const favorites = useSelector(selectFavPizzas)
    const favoriteId = useSelector(selectFavoriteID)
    const dispatch = useAppDispatch()

    const fetchPizzas = async () => {
        dispatch(fetchAllPizzas())
    }

    useEffect(() => {
        fetchPizzas().then()
    }, [favoriteId])

    return (
        <div className='container'>
            {status === Status.ERROR ?
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>
                        Не удалось получить ваши любимые пиццы.<br/>
                        Попробуйте повторить попытку позже или приготовьте ее сами.
                    </p>
                </div>
                :
                <div className='content__items'>
                    {status === Status.LOADING
                        ? [...new Array(6)].map((_, i) => <PizzaSkeleton key={i}/>)
                        :
                        <>
                            {favorites.length === 0 ?
                                <div className="content__error-info">
                                    <h2>У вас не избранных пицц 😕</h2>
                                </div>
                                :
                                favorites.map((pizza: PizzaBlockProps) =>
                                    <PizzaBlock key={pizza.id} {...pizza}/>
                                )
                            }
                        </>
                    }
                </div>
            }
            <Link to="/" className="button button--black">
                <span>Вернуться назад</span>
            </Link>
        </div>
    );
};

export default FavoritePage;