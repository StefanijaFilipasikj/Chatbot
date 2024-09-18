import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './PriceFilter.css';
import ChatbotService from "../../../../repository/ChatbotRepository";

const PriceFilter = forwardRef((props, ref) => {
    const valuetext = (value) => {
        return `${value}€`;
    }

    const [value, setValue] = useState([0, 100]);
    const [maxPrice, setMaxPrice] = useState(100);

    useImperativeHandle(ref, () => ({
        reset() {
            setValue([0, maxPrice]);
        }
    }));

    useEffect(() => {
        ChatbotService.getMaxPrice().then((response) => {
            const maxPrice = Math.ceil(response.data / 1000) * 1000;
            setMaxPrice(maxPrice);
            setValue([0, maxPrice]);
        });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.onFilterPrice(value[0], value[1]);
    };

    return (
        <form onSubmit={onFormSubmit}>
            <div className={"price-filter"}>
                <Box>
                    <Slider
                        getAriaLabel={() => 'Price range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        getAriaValueText={valuetext}
                        color="dark"
                        max={maxPrice}
                        step={500}
                    />
                </Box>
            </div>
            <button className={"btn btn-dark mt-3"} type={"submit"}>Filter</button>
        </form>
    );
});

export default PriceFilter;