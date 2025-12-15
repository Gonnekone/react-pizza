import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId} from "../redux/filterSlice/slice.js";

const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
]

function Categories() {
    const activeIndex = useSelector(state => state.filter.categoryId)
    const dispatch = useDispatch();

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, currentIndex) => (
                        <li
                            onClick={() => dispatch(setCategoryId(currentIndex))}
                            className={activeIndex === currentIndex ? "active" : ""}
                            key={category}
                        >
                            {category}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Categories;