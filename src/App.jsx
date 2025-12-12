import './scss/app.scss'
import Header from "./components/Header.jsx";

import React from "react";
import Home from "./pages/Home.jsx";
import {Route, Routes} from "react-router";
import NotFound from "./pages/NotFound.jsx";
import Cart from "./pages/Cart.jsx";
import { useSelector, useDispatch } from 'react-redux'

export const AppContext = React.createContext();

function App() {
    const [searchValue, setSearchValue] = React.useState("");
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();

    return (
        <div className="wrapper">
            <AppContext.Provider value={{searchValue, setSearchValue}}>
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
            </AppContext.Provider>
        </div>
    )
}

export default App
