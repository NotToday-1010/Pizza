import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import qs from 'qs'
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setUrlProps} from "../redux/slices/filterSlice";

const HomePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isMounted = useRef(false)
    const isSearch = useRef(false)
    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const page = useSelector((state) => state.filter.page)
    const selectedSort = useSelector((state) => state.filter.sort)
    const searchValue = useSelector((state) => state.search.searchQuery)
    const categoryID = useSelector(state => state.filter.categoryID)

    const fetchPizzas = () => {
        setIsLoading(true)
        axios.get(`https://64bfe9220d8e251fd111ac24.mockapi.io/items?page=${page}&limit=4&${categoryID !== 0 ? `category=${categoryID}` : ''}&sortBy=${selectedSort.sortQuery}&order=${selectedSort.order}&search=${searchValue}`)
            .then(res => {
                setPizzas(res.data)
                setIsLoading(false)
            })
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
            fetchPizzas()
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
            <div className='content__items'>
                {isLoading
                    ? [...new Array(6)].map((_, i) => <PizzaSkeleton key={i}/>)
                    : pizzas.map((pizza) =>
                        <PizzaBlock key={pizza.id} {...pizza}/>
                    )
                }
            </div>
            <Pagination/>
        </div>
    );
};

export default HomePage;