import React, {FC} from 'react';
import styles from './Language.module.scss';
import SelectCustom from "../Select/Select";

interface IProps {
    onChange: React.Dispatch<React.SetStateAction<string>>;
    language: string;
}

interface ILanguageOptions {
    value: string;
    label: string;
}

const LanguageSelect: FC<IProps> = ({onChange, language}) => {
    const languageOptions: ILanguageOptions[] = [
        {value: 'en', label: 'EN'},
        {value: 'uk', label: 'UK'},
        {value: 'ru', label: 'RU'},
    ];
    return (
        <div className={styles.wrapper}>
            <img src="/language.svg" alt="language"/>
            <SelectCustom onChange={onChange} language={language}/>
        </div>
    );
};
export default LanguageSelect;
