import React from 'react';
import styles from './NotFoundBlock.module.scss';

function NotFoundBlock() {
    return (
        <div className={styles.root}>
            <h1>
                <span>😔</span>
                <br/>
                Not Found :(
            </h1>
            <p className={styles.description}>
                Нет такой страницы
            </p>
        </div>
    );
}

export default NotFoundBlock;