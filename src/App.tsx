import './App.css';
import './scss/app.scss';

import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import {Routes, Route} from "react-router-dom";
import CartPage from "./pages/CartPage";
import EmptyCart from "./pages/EmptyCart";
import PizzaInfo from "./pages/PizzaInfo";
import MainLayout from "./Layouts/MainLayout";


function App() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/cart' element={<CartPage/>}></Route>
                <Route path='/empty-cart' element={<EmptyCart/>}></Route>
                <Route path='/pizza/:id' element={<PizzaInfo/>}></Route>
                <Route path='*' element={<NotFoundPage/>}></Route>
            </Route>
        </Routes>
    );
}

export default App;
