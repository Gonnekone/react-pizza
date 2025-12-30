import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton.js";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/index";
import {useSelector} from "react-redux";
import qs from "qs";
import {useNavigate} from "react-router";
import {selectFilter, setFilters} from "../redux/filterSlice/slice.js";
import {fetchItems, selectItems} from "../redux/itemSlice/slice.js";
import {useAppDispatch} from "../redux/store";
import {FilterSliceState} from "../redux/filterSlice/types";

const sortArr = ["rating", "price", "title"]

function Home() {
    const isParams = React.useRef(false);
    const isMounted = React.useRef(false);

    const {categoryId, sortId, pageNumber, searchValue} = useSelector(selectFilter);
    const {items, status} = useSelector(selectItems);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

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
            const params = qs.parse(window.location.search.substring(1)) as unknown as FilterSliceState;

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
                <Categories categoryId={categoryId}/>
                <Sort sortId={sortId}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === "error"
                    ? (
                        <div className={"content__error-info"}>
                            <h2>Произошла ошибка
                                <span>😕</span>
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