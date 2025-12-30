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

type CategoriesProps = {
    categoryId: number;
}

const Categories = React.memo(function Categories({categoryId}: CategoriesProps) {
    const dispatch = useDispatch();

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, currentIndex) => (
                        <li
                            onClick={() => dispatch(setCategoryId(currentIndex))}
                            className={categoryId === currentIndex ? "active" : ""}
                            key={category}
                        >
                            {category}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
})

export default Categories;