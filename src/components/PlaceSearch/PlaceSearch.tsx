import React, {FC, useState, useEffect} from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng, Suggestion} from 'react-places-autocomplete';
import styles from './PlaceSearch.module.scss';
import Button from '../Button/Button';
import {ISelectedPlace} from '../../types/Ilocation';
import {t} from "i18next";
import {getCurrentWeathersAsync} from "../../store/actions/weatherActions";
import {useDispatch} from "react-redux";

const PlaceSearch = () => {
    const [address, setAddress] = useState<string>('');
    const [apiLoaded, setApiLoaded] = useState<boolean>(false);
    const [listLoaded, setListLoaded] = useState<boolean>(false);
    const [selectedPlace, setSelectedPlace] = useState<ISelectedPlace>({latitude: 0, longitude: 0, city: ''});
    console.log(selectedPlace)
    const dispatch = useDispatch();
    useEffect(() => {
        const script = document.createElement('script');
        // script.src = `https://maps.googleapis.com/maps/api/js?key=&libraries=places`;
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA9bslaj5Bl5nLuQQXe8rr_PkhDvvZqzMs&libraries=places`;
        script.async = true;
        script.onload = () => setApiLoaded(true);
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    const addPlaceToBoard = () => {
        if (selectedPlace.latitude || selectedPlace.longitude) {
            dispatch(getCurrentWeathersAsync({latitude: selectedPlace.latitude, longitude: selectedPlace.longitude}))
            setAddress('');
        }
    }
    const handleChange = (newAddress: string) => {
        setAddress(newAddress);
    };
    const handleSelect = async (selectedAddress: string) => {
        try {
            const results = await geocodeByAddress(selectedAddress);
            const latLng = await getLatLng(results[0]);
            setSelectedPlace({
                latitude: latLng.lat,
                longitude: latLng.lng,
                city: results[0]?.address_components[0]?.long_name
            });
            setAddress(selectedAddress);
        } catch (error) {
            console.error('Error selecting city:', error);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.input}>
                <div className={styles.btnTop}>
                    <Button onClick={addPlaceToBoard}/>
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
                    <Button onClick={addPlaceToBoard}/>
                </div>
            </div>
        </div>
    );
};

export default PlaceSearch;