import React, {FC, useCallback, useEffect, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import qs from 'qs'
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {useSelector} from "react-redux";
import {
    selectFilterCategoryID,
    selectFilterPage, selectFilterSort, setCategory,
    setUrlProps
} from "../redux/slices/filterSlice";
import {fetchPizzas, selectPizza, selectPizzaStatus, Status} from "../redux/slices/pizzasSlice";
import {selectSearchSearchQuery} from "../redux/slices/searchSlice";
import {useAppDispatch} from "../redux/store";

type SearchParamsType = {
    categoryID: string,
    order: string,
    page: string,
    sortName: string,
    sortQuery: string
}

type PizzaBlockProps = {
    price: number,
    title: string,
    imageUrl: string,
    sizes: number[],
    types: number[],
    id: string
}

const HomePage: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isMounted = useRef(false)
    const isSearch = useRef(false)

    const status: Status = useSelector(selectPizzaStatus)
    const page = useSelector(selectFilterPage)
    const selectedSort = useSelector(selectFilterSort)
    const searchValue = useSelector(selectSearchSearchQuery)
    const categoryID = useSelector(selectFilterCategoryID)
    const pizzas = useSelector(selectPizza)

    const onChangeCategory = useCallback((idx: number) => {
        dispatch(setCategory(idx))
    }, [])

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
            const params = (qs.parse(urlParams.substring(1)) as unknown) as SearchParamsType
            dispatch(setUrlProps({
                page: Number(params.page),
                sort: {
                    name: params.sortName,
                    sortQuery: params.sortQuery,
                    order: params.order,
                },
                categoryID: Number(params.categoryID)
            }))
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
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
                <Categories onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            {status === Status.ERROR ?
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>
                        Не удалось получить пиццы.<br/>
                        Попробуйте повторить попытку позже или никогда.
                    </p>
                </div>
                : <div className='content__items'>
                    {status === Status.LOADING
                        ? [...new Array(6)].map((_, i) => <PizzaSkeleton key={i}/>)
                        : pizzas.map((pizza: PizzaBlockProps) =>
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