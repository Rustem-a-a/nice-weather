import React, {useEffect, useState} from 'react';
import './App.css';
import Language from "./components/Language/Language";
import {useTranslation} from "react-i18next";

function App() {
    const [language, setLanguage] = useState<string>('');
    const {t,i18n} = useTranslation();
    useEffect(() => {
        const lng = navigator.language;
        if(lng && !language){
            setLanguage(lng);
        }
        else if(!language){setLanguage('en')}
        i18n.changeLanguage(language)
    }, [language]);

     return (
        <div className="App">
            <Language language={language} onChange={setLanguage}/>
            <p>{t('weather.cloud')}</p>
        </div>
    );
}
export default App;
