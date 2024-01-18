import React from 'react';
import styles from './Button.module.scss'

const Button = () => {
    return (
        <button className={`${styles.button} ${styles.blue}`}>
            Add
        </button>
    );
};

export default Button;
