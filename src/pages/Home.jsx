import React from 'react';
import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock.jsx";
import Pagination from "../components/Pagination/index.jsx";
import {AppContext} from "../App.jsx";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import qs from "qs";
import {useNavigate} from "react-router";
import {setFilters} from "../redux/filterSlice/slice.js";

const sortArr = ["rating", "price", "title"]

function Home() {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const isParams = React.useRef(false);
    const isMounted = React.useRef(false);

    const categoryId = useSelector(state => state.filter.categoryId);
    const sortId = useSelector(state => state.filter.sortId);
    const pageNumber = useSelector(state => state.filter.pageNumber);

    const {searchValue} = React.useContext(AppContext);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getPizzas = () => {
        setIsLoading(true)

        axios.get(`https://6937f1194618a71d77ce4027.mockapi.io/items?` +
            `page=${pageNumber}&limit=4&sortBy=${sortArr[sortId]}` +
            `${categoryId === 0 ? "" : `&category=${categoryId}`}` +
            `${searchValue === "" ? "" : `&search=${searchValue}`}`)
            .then((response) => {
                setItems(response.data)
                setIsLoading(false);
            })
    }

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            dispatch(setFilters({...params}));

            isParams.current = true
        }
    }, [])

    React.useEffect(() => {
        window.scroll(0, 0);

        if (!isParams.current) {
            getPizzas()
        }

        isParams.current = false
    }, [sortId, categoryId, searchValue, pageNumber]);

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortId,
                categoryId,
                pageNumber,
            })

            navigate(`?${queryString}`);
        }

        isMounted.current = true;
    }, [sortId, categoryId, pageNumber])

    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                        : items.map(item => (
                            <PizzaBlock key={item.id} {...item}/>
                        ))
                }
            </div>
            <Pagination/>
        </div>
    );
}

export default Home;