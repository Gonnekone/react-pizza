import React from 'react';
import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock.jsx";
import Pagination from "../components/Pagination/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import qs from "qs";
import {Link, useNavigate} from "react-router";
import {selectFilter, setFilters} from "../redux/filterSlice/slice.js";
import {fetchItems, selectItems} from "../redux/itemSlice/slice.js";

const sortArr = ["rating", "price", "title"]

function Home() {
    const isParams = React.useRef(false);
    const isMounted = React.useRef(false);

    const {categoryId, sortId, pageNumber, searchValue} = useSelector(selectFilter);
    const {items, status} = useSelector(selectItems);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getPizzas = async () => {
        dispatch(fetchItems({
            pageNumber,
            categoryId,
            searchValue,
            sort: sortArr[sortId],
        }))
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
            {
                status === "error"
                    ? (
                        <div className={"content__error-info"}>
                            <h2>Произошла ошибка
                                <icon>😕</icon>
                            </h2>
                            <p>Не удалось получить питсы.</p>
                        </div>
                    )
                    : (
                        <div className="content__items">
                            {
                                status === "loading"
                                    ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                                    : items.map(item => (
                                        <PizzaBlock key={item.id} {...item}/>
                                    ))
                            }
                        </div>
                    )
            }
            <Pagination/>
        </div>
    );
}

export default Home;