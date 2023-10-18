import React, {FC, useEffect, useRef} from 'react';
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectOnePizza, selectOnePizzaStatus} from "../redux/pizzas/pizzasSlice";
import PizzaSkeletonForDescription from "../components/PizzaBlock/PizzaSkeletonForDescription";
import {useAppDispatch} from "../redux/store";
import {Status} from "../redux/pizzas/pizzasTypes";
import {fetchOnePizza} from "../redux/pizzas/asyncActions";

const PizzaInfo: FC = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams<string>()
    const status: Status = useSelector(selectOnePizzaStatus)
    const divBlock = useRef(null)
    const width = useRef(null)

    useEffect(() => {
        if (id) {
            dispatch(fetchOnePizza(id))
        }
    }, []);

    useEffect(() => {
        // @ts-ignore
        width.current = divBlock.current?.getBoundingClientRect().width
    }, [divBlock]);

    const pizza = useSelector(selectOnePizza)


    return (
        <div className='container' ref={divBlock}>
            {status === Status.ERROR ?
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>
                        Не удалось получить пиццу.<br/>
                        Попробуйте повторить попытку позже или приготовьте ее сами.
                    </p>
                </div>
                :
                <>
                    {status === Status.LOADING
                        ?
                        // @ts-ignore
                        <PizzaSkeletonForDescription divWidth={width.current}/>
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