import React, {useCallback, useEffect, useState} from 'react';
import {ApiCountry} from "../../types";
import axios from "axios";
import {BASE_URL, COUNTRY_ALPHA_URL} from "../../constans";

interface Props{
    alpha3Code:string | null;
}

const ShowCountry:React.FC<Props> = ({alpha3Code}) => {
    const [country, setCountry]= useState<null | ApiCountry >(null)

    const fetchCountry = useCallback( async ()=>{
        if(alpha3Code !== null){
            const {data: country} = await axios.get<ApiCountry>(BASE_URL + COUNTRY_ALPHA_URL + alpha3Code);
            setCountry(country);
        }
    },[alpha3Code]);

    useEffect(() => {
        void fetchCountry();
    }, [fetchCountry]);

    return country && (
            <div className="ShowCountry">
                <div>
                    <h1>{country.name}</h1>
                    <span>Capital:{country.capital}</span>
                    <span>Population:{country.population}</span>
                </div>

            </div>

    )
        ;
};

export default ShowCountry;