import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface IProps {
    onChange: React.Dispatch<React.SetStateAction<string>>;
    language: string;
}
const SelectCustom:React.FC<IProps> = ({onChange,language}) => {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value);
    };


    return (
        <div>
            <FormControl>
                <Select
                    value={language}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{
                        color:'gray',
                        borderRadius: 0,
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: 0
                        },
                        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "none"
                        }
                    }}
                >
                    <MenuItem value={'en'}>EN</MenuItem>
                    <MenuItem value={'uk'}>UK</MenuItem>
                    <MenuItem value={'ru'}>RU</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectCustom