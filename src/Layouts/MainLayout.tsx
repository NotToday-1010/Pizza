import React, {FC} from 'react';
import Header from "../components/Header";
import {Outlet} from "react-router-dom";

const MainLayout: FC = () => {
    return (
        <div className='App'>
            <div className='wrapper'>
                <Header/>
                <div className='content'>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;