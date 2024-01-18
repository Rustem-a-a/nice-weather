import React, {FC, useState} from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng, Suggestion} from 'react-places-autocomplete';
import styles from './PlaceSearch.module.scss'
import Button from '../Button/Button';

interface IProps {
    onSelect: (selectedCity: string) => void;
}

const PlaceSearch: FC<IProps> = ({onSelect}) => {
    const [address, setAddress] = useState<string>('');
    const handleChange = (newAddress: string) => {
        setAddress(newAddress);
    };
    const handleSelect = async (selectedAddress: string) => {
        try {
            const results = await geocodeByAddress(selectedAddress);
            const latLng = await getLatLng(results[0]);
            console.log('Selected City:', selectedAddress);
            console.log('Latitude and Longitude:', latLng);
            onSelect(selectedAddress);
            setAddress(selectedAddress);
        } catch (error) {
            console.error('Error selecting city:', error);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.input}>
                <PlacesAutocomplete
                    value={address}
                    onChange={handleChange}
                    onSelect={handleSelect}
                >
                    {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                        <div className={styles.inputAndSuggestion}>
                            <input
                                {...getInputProps({
                                    placeholder: 'Search for a city...',
                                    className: `${styles.locationSearchInput} location-search-input`
                                })}
                            />
                            <div className={`autocomplete-dropdown-container ${styles.items}`}>
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion: Suggestion) => {
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
                        </div>
                    )}
                </PlacesAutocomplete>
            </div>
            <div className={styles.btn}>
                <Button/>
            </div>
        </div>
    );

};

export default PlaceSearch;


