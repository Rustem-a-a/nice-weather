import React, {FC} from 'react';
import styles from './Button.module.scss'
import {t} from "i18next";

interface IProps{
    onClick: ()=>void
}
const Button: FC<IProps> = ({onClick}) => {
    return (
        <button onClick={onClick} className={`${styles.button} ${styles.blue}`}>
            {t('btnAdd')}
        </button>
    );
};

export default Button;
