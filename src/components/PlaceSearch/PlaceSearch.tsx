import React, {useState, useEffect} from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng, Suggestion} from 'react-places-autocomplete';
import styles from './PlaceSearch.module.scss';
import Button from '../Button/Button';
import {ISelectedPlace} from '../../types/Ilocation';
import {t} from "i18next";
import {getCurrentWeathersAsync} from "../../store/actions/weatherActions";
import {useDispatch} from "react-redux";
import {GOOGLE_API_KEY} from '../../API_KEY'
import {Dispatch} from "../../store/store";

const PlaceSearch = () => {
    const [address, setAddress] = useState<string>('');
    const [apiLoaded, setApiLoaded] = useState<boolean>(false);
    const [selectedPlace, setSelectedPlace] = useState<ISelectedPlace>({latitude: 0, longitude: 0, city: ''});
    const dispatch: Dispatch = useDispatch();
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places&callback=initMap`;
        script.async = true;
        (window as any).initMap = () => {
            setApiLoaded(true);
        };
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    const addPlaceToBoard = () => {
        if (selectedPlace.latitude && selectedPlace.longitude && address) {
            dispatch(getCurrentWeathersAsync({latitude: selectedPlace.latitude, longitude: selectedPlace.longitude}));
            setAddress('');
        }
    }
    const handleChange = (newAddress: string) => {
        setAddress(newAddress);
    };
    const handleSelect = async (selectedAddress: string) => {
        try {
            setAddress(selectedAddress);
            const results = await geocodeByAddress(selectedAddress);
            const latLng = await getLatLng(results[0]);
            setSelectedPlace({
                latitude: latLng.lat,
                longitude: latLng.lng,
                city: results[0]?.address_components[0]?.long_name
            });
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
                            return (
                                <div className={styles.inputAndSuggestion}>
                                    <input
                                        {...getInputProps(
                                            {
                                                placeholder: t('citySearch'),
                                                className: styles.locationSearchInput,
                                                onKeyDown: (e) => {
                                                    if (e.key === 'Enter') {
                                                        addPlaceToBoard();
                                                    }
                                                }
                                            }
                                        )}
                                    />
                                    {suggestions.length > 0 &&
                                        <div className={styles.items}>
                                            {suggestions.map((suggestion: Suggestion, i) => {
                                                const switchClass = suggestion.active ? styles.activeItem : '';
                                                return (
                                                    <div  {...getSuggestionItemProps(suggestion, {className: `${styles.item} ${switchClass}`})}
                                                          key={suggestion.description}>
                                                        {suggestion.description}
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
