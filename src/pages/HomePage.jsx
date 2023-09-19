import React, {useEffect, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import qs from 'qs'
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {setUrlProps} from "../redux/slices/filterSlice";
import {fetchPizzas} from "../redux/slices/pizzasSlice";

const HomePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isMounted = useRef(false)
    const isSearch = useRef(false)

    const status = useSelector(state => state.pizza.status)
    const page = useSelector((state) => state.filter.page)
    const selectedSort = useSelector((state) => state.filter.sort)
    const searchValue = useSelector((state) => state.search.searchQuery)
    const categoryID = useSelector(state => state.filter.categoryID)
    const pizzas = useSelector(state => state.pizza.allPizzas)

    const loadPizzas = async () => {
        dispatch(fetchPizzas({
            page,
            selectedSort,
            searchValue,
            categoryID
        }))
        window.scrollTo(0, 0)
    }

    useEffect(() => {
        const urlParams = window.location.search
        if (urlParams) {
            const params = qs.parse(urlParams.substring(1))
            dispatch(setUrlProps({
                page: params.page,
                name: params.sortName,
                sortQuery: params.sortQuery,
                order: params.order,
                id: Number(params.categoryID)
            }))
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            loadPizzas().then()
        }
        isSearch.current = false
    }, [categoryID, selectedSort, searchValue, page])

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortName: selectedSort.name,
                sortQuery: selectedSort.sortQuery,
                order: selectedSort.order,
                page,
                categoryID,
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryID, selectedSort, page])

    return (
        <div className='container'>
            <div className='content__top'>
                <Categories/>
                <Sort/>
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            {status === 'error' ?
                <div className="content__error-info">
                    <h2>Произошла ошибка <icon>😕</icon></h2>
                    <p>
                        Не удалось получить пиццы.<br/>
                        Попробуйте повторить попытку позже или никогда.
                    </p>
                </div>
                : <div className='content__items'>
                    {status === 'loading'
                        ? [...new Array(6)].map((_, i) => <PizzaSkeleton key={i}/>)
                        : pizzas.map((pizza) =>
                            <PizzaBlock key={pizza.id} {...pizza}/>
                        )
                    }
                </div>
            }

            <Pagination/>
        </div>
    );
};

export default HomePage;