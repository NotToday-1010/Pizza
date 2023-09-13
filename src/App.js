import './App.css';
import './scss/app.scss';

import Header from './components/Header';
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import {Routes, Route} from "react-router-dom";
import CartPage from "./pages/CartPage";
import React from "react";


function App() {

    return (<div className='App'>
        <div className='wrapper'>
            <Header/>
            <div className='content'>
                <Routes>
                    <Route path='/' element={<HomePage/>}></Route>
                    <Route path='/cart' element={<CartPage/>}></Route>
                    <Route path='*' element={<NotFoundPage/>}></Route>
                </Routes>
            </div>
        </div>
    </div>);
}

export default App;
