import React from 'react';
import styles from './Button.module.scss'
import {t} from "i18next";

const Button = () => {
    return (
        <button className={`${styles.button} ${styles.blue}`}>
            {t('btnAdd')}
        </button>
    );
};

export default Button;
