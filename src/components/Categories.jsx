import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setCategoryId} from "../redux/filterSlice/slice.js";

const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
]

function Categories() {
    const {categoryId: activeIndex} = useSelector(selectFilter);
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