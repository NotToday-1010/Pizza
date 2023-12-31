import {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addPizza, selectCartEachPizzaCount} from "../../redux/cart/cartSlice";
import {Link} from "react-router-dom";
import favoriteSvg from "../../assets/img/favorite.svg";
import AddedFavoriteSvg from "../../assets/img/AddedFavorite.svg";
import {addOneFavorite, removeOneFavorite, selectFavoriteID} from "../../redux/favorite/favoriteSlice";

export type PizzaBlockProps = {
    price: number,
    title: string,
    imageUrl: string,
    sizes: number[],
    types: number[],
    id: string
}

const PizzaBlock: FC<PizzaBlockProps> = ({price, title, imageUrl, sizes, types, id}) => {
    const [pizzaCount, setPizzaCount] = useState(0)
    const eachPizzaCount = useSelector(selectCartEachPizzaCount)
    const favoritesId = useSelector(selectFavoriteID)
    const dispatch = useDispatch()
    const [activeType, setActiveType] = useState(types.slice(-1)[0])
    const [activeSize, setActiveSize] = useState(sizes.slice(-1)[0])
    const typeNames = ['тонкое', 'традиционное']

    useEffect(() => {
        let flag = 0
        for (let pizzaId in eachPizzaCount) {
            if (Number(id) === Number(pizzaId)) {
                flag = 1
            }
        }
        if (flag) {
            setPizzaCount(eachPizzaCount[Number(id)])
        }
    }, [])

    const addPizzaInCart = () => {
        dispatch(addPizza({
            title,
            type: typeNames[activeType],
            size: activeSize,
            price,
            id,
            imageUrl,
            count: 1
        }))
        setPizzaCount(prevState => prevState + 1)
    }

    const addPizzaInFavorite = (id: string) => {
        dispatch(addOneFavorite(id))
    }

    const removePizzaInFavorite = (id: string) => {
        dispatch(removeOneFavorite(id))
    }

    return (
        <div className='pizza-block-wrapper'>
            <div className='pizza-block'>
                <Link to={`/pizza/${id}`}>
                    <img
                        className='pizza-block__imageMain'
                        src={imageUrl}
                        alt='Pizza'
                    />

                </Link>

                <h4 className='pizza-block__title'>
                    {title}
                    {favoritesId.includes(id) ?
                        <span onClick={() => removePizzaInFavorite(id)}>
                                    <img width='38' src={AddedFavoriteSvg} alt='favorite image'/>
                                 </span>
                        :
                        <span onClick={() => addPizzaInFavorite(id)}>
                                    <img width='38' src={favoriteSvg} alt='favorite image'/>
                                </span>
                    }
                </h4>
                <div className='pizza-block__selector'>
                    <ul>
                        {types.map(typeID =>
                            <li
                                key={typeID}
                                onClick={() => setActiveType(typeID)}
                                className={activeType === typeID ? 'active' : ''}
                            >
                                {typeNames[typeID]}
                            </li>
                        )}
                    </ul>
                    <ul>
                        {sizes.map(size =>
                            <li
                                key={size}
                                onClick={() => setActiveSize(size)}
                                className={size === activeSize ? 'active' : ''}
                            >
                                {size} см.
                            </li>
                        )}
                    </ul>
                </div>
                <div className='pizza-block__bottom'>
                    <div className='pizza-block__price'>от {price} ₽</div>
                    <button className='button button--outline button--add' onClick={() => {
                        addPizzaInCart()
                    }}>
                        <svg
                            width='12'
                            height='12'
                            viewBox='0 0 12 12'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                                fill='white'
                            />
                        </svg>
                        <span>Добавить</span>
                        {pizzaCount > 0 && <i>{pizzaCount}</i>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PizzaBlock;
