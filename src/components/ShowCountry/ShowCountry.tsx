import React, {useCallback, useEffect, useState} from "react";
import {ApiCountries, ApiCountry} from "../../types";
import axios from "axios";
import {BASE_URL, COUNTRY_ALPHA_URL} from "../../constans";
import './ShowCountry.css'

interface Props{
    alpha3Code:string | null;
}

const ShowCountry: React.FC<Props> = ({ alpha3Code }) => {
    const [country, setCountry] = useState<null | ApiCountry>(null);
    const [borderCountries, setBorderCountries] = useState<ApiCountries[]>([]);

    const fetchCountry = useCallback(async () => {
        if (alpha3Code !== null) {
            const { data: country } = await axios.get<ApiCountry>(BASE_URL + COUNTRY_ALPHA_URL + alpha3Code);
            setCountry(country);
            setBorderCountries([]);

            if (country.borders && country.borders.length > 0) {
                const promises = country.borders.map(async (borderAlpha) => {
                    const { data: borderCountry } = await axios.get<ApiCountries>(BASE_URL + COUNTRY_ALPHA_URL + borderAlpha);
                    return {
                        alpha3Code: borderCountry.alpha3Code,
                        name: borderCountry.name,
                    };
                });

            const newBorders = await Promise.all(promises);
            setBorderCountries(newBorders);
            }
        }
    }, [alpha3Code]);

    useEffect(() => {
        void fetchCountry();
    }, [fetchCountry]);

    return country ? (
        <>
            <div className="ShowCountry-main">
                <div className="ShowCountry-main-Info">
                    <h1>{country.name}</h1>
                    <span className="ShowCountry-main-Info-Capital">
                        <strong>Capital:</strong> {country.capital}
                    </span>
                    <span className="ShowCountry-main-Info-Population">
                        <strong>Population:</strong> {country.population}
                    </span>
                </div>
                <div className="ShowCountry-main-Info-img">
                    <img src={country.flags.png} alt={country.name} className="country-image" />
                </div>
            </div>
            <div className="ShowCountry-border">
                <h4>Border with:</h4>
                <ul className="Borders">
                    {borderCountries.length > 0 ? (
                        borderCountries.map((border) => (
                            <li className="Border" key={border.alpha3Code}>
                                {border.name}
                            </li>
                        ))
                    ) : (
                        <li>No neighbor</li>
                    )}
                </ul>
            </div>
        </>
    ) : (
        <div>Loading...</div>
    );
};

export default ShowCountry;
