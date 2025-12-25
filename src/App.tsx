import './scss/app.scss'
import Header from "./components/Header.js";

import Home from "./pages/Home.js";
import {Route, Routes} from "react-router";
import NotFound from "./pages/NotFound.js";
import Cart from "./pages/Cart.js";
import FullPizza from "./pages/FullPizza.js";

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
