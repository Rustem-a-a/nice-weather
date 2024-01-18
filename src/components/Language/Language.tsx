import React, {FC} from 'react';
import styles from './Language.module.scss';

interface IProps {
    onChange: React.Dispatch<React.SetStateAction<string>>;
    language: string;
};

interface ILanguageOptions {
    value: string;
    label: string
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
            <select
                value={language}
                onChange={(e) => {
                    onChange(e.target.value)
                }}
            >
                {languageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default LanguageSelect;

