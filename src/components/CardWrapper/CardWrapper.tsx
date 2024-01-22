import React, {FC} from 'react';
import Card from '../Card/Card';
import {IResponseCurrentWeather, IWeeklyForecast} from '../../types/IForecast';
import {motion, AnimatePresence} from 'framer-motion';
import styles from './CardWrapper.module.scss';

const appear = {
    visible: {
        opacity: 1,
        scale: 1,
        transition: {duration: 0.5, ease: 'easeOut'},
    },
    hidden: {opacity: 0, scale: 0.1, transition: {duration: 0.3}}
};

interface IProps {
    weather: {
        currentWeather: IResponseCurrentWeather;
        weeklyWeather: IWeeklyForecast[];
        isCelsius: boolean;
    }[];
}

const CardWrapper: FC<IProps> = ({weather}) => {
    return (
        <div className={styles.wrapper}>
            <AnimatePresence>
                {weather.length > 0 &&
                    weather.map((v, i: number) => (
                        <motion.div
                            key={v.currentWeather.coord.lat}
                            custom={i}
                            initial={{opacity: 0, scale: 0.3}}
                            variants={appear}
                            animate={'visible'}
                            exit={'hidden'}
                        >
                            <Card
                                key={v.currentWeather.coord.lat}
                                currentWeather={v.currentWeather}
                                weeklyWeather={v.weeklyWeather}
                                isCelsius={v.isCelsius}
                            />
                        </motion.div>
                    ))}
            </AnimatePresence>
        </div>
    );
};

export default CardWrapper;