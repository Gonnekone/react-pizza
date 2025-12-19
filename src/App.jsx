import './scss/app.scss'
import Header from "./components/Header.jsx";

import React from "react";
import Home from "./pages/Home.jsx";
import {Route, Routes} from "react-router";
import NotFound from "./pages/NotFound.jsx";
import Cart from "./pages/Cart.jsx";
import FullPizza from "./pages/FullPizza.jsx";

function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/pizza/:id" element={<FullPizza/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App
