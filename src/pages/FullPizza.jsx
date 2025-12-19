import React from 'react';
import {useParams} from "react-router";
import axios from "axios";

function FullPizza() {
    const [item, setItem] = React.useState();
    const [error, setError] = React.useState();
    const {id} = useParams();

    React.useEffect(() => {
        async function fetchItem() {
            try {
                const { data } = await axios.get(
                    "https://6937f1194618a71d77ce4027.mockapi.io/items/" + id,
                );
                setItem(data);
            } catch (error) {
                setError(error);
            }
        }
        fetchItem();
    }, []);

    if (error) {
        return <>Ошибка...</>;
    }

    if (!item) {
        return <>Загрузка...</>;
    }

    return (
        <div className="container container__full-pizza">
            <div className="pizza">
                <img src={item.imageUrl} alt="Pizza" style={{width: "260px"}}/>
                <h2>{item.title}</h2>
                <h4>{item.price} ₽</h4>
            </div>
            <p>
                Пепперони — одна из самых популярных и любимых пицц во всем мире.
                Классическая американская пицца с характерным островатым вкусом, который идеально сочетается с тягучим сыром.
                Тонкая или традиционная основа покрывается томатным соусом, обильным количеством моцареллы и аппетитными кружками острой колбасы пепперони,
                которые при запекании слегка закручиваются по краям, образуя "чашечки" с хрустящей корочкой.<br/>
                Идеальный выбор для тех, кто любит пикантные и насыщенные вкусы. Отлично подходит для вечеринок, семейных ужинов или когда хочется чего-то остренького.
            </p>
        </div>
    );
}

export default FullPizza;