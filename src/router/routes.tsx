import React, {lazy, ReactNode, Suspense} from 'react';
import HomePage from "../pages/HomePage";
import {Route, Routes} from "react-router-dom";
import styles from "../components/NotFoundBlock/NotFound.module.scss";
import MainLayout from "../Layouts/MainLayout";


const CartPage = lazy(() => import(/* webpackChuckName: "CartPage" */ "../pages/CartPage"))
const EmptyCart = lazy(() => import(/* webpackChuckName: "EmptyCart" */ "../pages/EmptyCart"))
const PizzaInfo = lazy(() => import(/* webpackChuckName: "PizzaInfo" */ "../pages/PizzaInfo"))
const FavoritePage = lazy(() => import(/* webpackChuckName: "PizzaInfo" */ "../pages/FavoritePage"))
const NotFoundPage = lazy(() => import(/* webpackChuckName: "NotFoundPage" */ "../pages/NotFoundPage"))

enum routes {
    HOME = '/',
    CART = 'cart',
    EMPTY_CART = 'empty-cart',
    PIZZA_INFO = 'pizza/:id',
    FAVORITE = 'favorite',
    NOT_FOUND = '*'
}

type PathAndElement = {
    path: routes,
    element: ReactNode,
    fallback: string
}

const appRoutes: PathAndElement[] = [
    {path: routes.HOME, element: <HomePage/>, fallback: 'Загрузка главной страницы...'},
    {path: routes.CART, element: <CartPage/>, fallback: 'Загрузка корзины...'},
    {path: routes.EMPTY_CART, element: <EmptyCart/>, fallback: 'Загрузка пустой корзины...'},
    {path: routes.PIZZA_INFO, element: <PizzaInfo/>, fallback: 'Загрузка информации о пицце...'},
    {path: routes.NOT_FOUND, element: <NotFoundPage/>, fallback: 'Загрузка страницы с ошибкой...'},
    {path: routes.FAVORITE, element: <FavoritePage/>, fallback: 'Загрузка страницы с любимыми пиццами...'},
    {path: routes.NOT_FOUND, element: <NotFoundPage/>, fallback: 'Загрузка страницы с ошибкой...'},
]

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                {
                    appRoutes.map(({path, element, fallback}) => (
                        <Route key={path} path={path} element={
                            <Suspense fallback={<div className={styles.description}>{fallback}</div>}>
                                {element}
                            </Suspense>
                        }>
                        </Route>
                    ))
                }
            </Route>
        </Routes>
    )
}

