import React from 'react';

import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/filterSlice/slice.js";

function Search() {
    const [value, setValue] = React.useState('');
    const inputRef = React.useRef();
    const dispatch = useDispatch();

    const onClear = () => {
        dispatch(setSearchValue(""))
        setValue('')
        inputRef.current.focus()
    }

    const deb = React.useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str));
        }, 300), [],
    );

    const onChangeInput = (e) => {
        setValue(e.target.value)
        deb(e.target.value)
    }

    return (
        <div className={styles.root}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className={styles.icon}>
                <path d="m21 21-4.34-4.34"/>
                <circle cx="11" cy="11" r="8"/>
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.input}
                placeholder={"Поиск пиццы..."}
            />
            {value && (
                <svg onClick={onClear} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className={styles.clearIcon}
                >
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                </svg>
            )}
        </div>
    )
}

export default Search;