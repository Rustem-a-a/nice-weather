import React, {FC, useState, useEffect} from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng, Suggestion} from 'react-places-autocomplete';
import styles from './PlaceSearch.module.scss';
import Button from '../Button/Button';
import {ISelectedPlace} from '../../types/Ilocation';
import {t} from "i18next";

interface IProps {
    onSelect: React.Dispatch<React.SetStateAction<ISelectedPlace>>;
}

const PlaceSearch: FC<IProps> = ({onSelect}) => {
    const [address, setAddress] = useState<string>('');
    const [apiLoaded, setApiLoaded] = useState<boolean>(false);
    const [listLoaded, setListLoaded] = useState<boolean>(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=&libraries=places`;
        // script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA9bslaj5Bl5nLuQQXe8rr_PkhDvvZqzMs&libraries=places`;
        script.async = true;
        // AIzaSyA9bslaj5Bl5nLuQQXe8rr_PkhDvvZqzMs
        script.onload = () => setApiLoaded(true);

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleChange = (newAddress: string) => {
        setAddress(newAddress);
    };

    const handleSelect = async (selectedAddress: string) => {
        try {
            const results = await geocodeByAddress(selectedAddress);
            const latLng = await getLatLng(results[0]);
            console.log('Selected City:', selectedAddress);
            console.log(results);
            console.log('Latitude and Longitude:', latLng);
            onSelect({latitude: latLng.lat, longitude: latLng.lng, city: results[0]?.address_components[0]?.long_name});
            setAddress(selectedAddress);
        } catch (error) {
            console.error('Error selecting city:', error);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.input}>
                <div className={styles.btnTop}>
                    <Button/>
                </div>
                {!apiLoaded &&
                    <input
                        className={styles.locationSearchInput}/>}
                {apiLoaded && (<PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
                        {({getInputProps, suggestions, getSuggestionItemProps, loading}) => {
                            suggestions.length ? setListLoaded(true) : setListLoaded(false)

                            return (
                                <div className={styles.inputAndSuggestion}>
                                    <input
                                        {...getInputProps({
                                            placeholder: t('citySearch'),
                                            className: `${styles.locationSearchInput} location-search-input`,
                                        })}
                                    />
                                    {listLoaded &&
                                        <div className={`autocomplete-dropdown-container ${styles.items}`}>
                                            {/*{loading && <div>Loading...</div>}*/}
                                            {suggestions.slice(0, 3).map((suggestion: Suggestion) => {
                                                const className = suggestion.active ? styles.activeItem : styles.notActiveItem;
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                        })}
                                                    >
                                                        <span className={styles.drop}>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    }
                                </div>
                            )
                        }}
                    </PlacesAutocomplete>
                )}
                <div className={styles.btn}>
                    <Button/>
                </div>
            </div>

        </div>
    );
};

export default PlaceSearch;
