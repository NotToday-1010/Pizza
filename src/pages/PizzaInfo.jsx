import React, {useEffect, useRef} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchOnePizza, selectOnePizza, selectOnePizzaStatus} from "../redux/slices/pizzasSlice";
import PizzaSkeletonForDescription from "../components/PizzaBlock/PizzaSkeletonForDescription";

const PizzaInfo = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const status = useSelector(selectOnePizzaStatus)
    const divBlock = useRef(null)
    const width = useRef(null)

    useEffect(() => {
        dispatch(fetchOnePizza(id))
    }, []);

    useEffect(() => {
        width.current = divBlock.current.getBoundingClientRect().width
    }, [divBlock]);

    const pizza = useSelector(selectOnePizza)

    return (
        <div className='container' ref={divBlock}>
            {status === 'error' ?
                <div className="content__error-info">
                    <h2>Произошла ошибка <icon>😕</icon></h2>
                    <p>
                        Не удалось получить пиццу.<br/>
                        Попробуйте повторить попытку позже или приготовьте ее сами.
                    </p>
                </div>
                :
                <>
                    {status === 'loading'
                        ?
                        <PizzaSkeletonForDescription divBlock={width.current}/>
                        :
                        <div className='pizza-block-wrapper'>
                            <div className='pizza-block' style={{width: "800px"}}>
                                <img
                                    className='pizza-block__image'
                                    src={pizza.imageUrl}
                                    alt='Pizza'
                                />
                                <h4 className='pizza-block__title'>{pizza.title}</h4>
                                <p>Состав: {pizza.compound}.</p>
                            </div>
                        </div>
                    }
                </>
            }
            <Link to="/" className="button button--black">
                <span>Вернуться назад</span>
            </Link>
        </div>
    )
}


export default PizzaInfo;