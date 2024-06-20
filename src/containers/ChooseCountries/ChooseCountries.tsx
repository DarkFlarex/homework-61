import {useCallback,useEffect, useState} from "react";
import {ApiCountries} from "../../types";
import axios from 'axios';
import {BASE_URL, COUNTRIES_URL, COUNTRY_ALPHA_URL} from "../../constans";
import Country from "../../components/Country/Country";
import './ChooseCountries.css';
import ShowCountry from "../../components/ShowCountry/ShowCountry";

const ChooseCountries = () => {
 const [countries, setCountries] = useState<ApiCountries[]>([]);
    const [selectedCountryAlphaCode, setSelectedCountryAlphaCode] = useState<string | null>(null);

    const fetchData = useCallback(async () =>{
        const {data: countries} = await axios.get<ApiCountries[]>(BASE_URL + COUNTRIES_URL);
        const promises = countries.map(async country => {
            const CountryUrl = BASE_URL + COUNTRY_ALPHA_URL  + country.alpha3Code;
            const {data: countryName} = await axios.get<ApiCountries>(CountryUrl);

            return {
                alpha3Code: countryName.alpha3Code,
                name: countryName.name,
            };
        });

        const newCountries = await Promise.all(promises);
        setCountries(newCountries);
    }, []);

    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    return (
        <div className="container">
            <div className="Countries-list">
                {countries.map((country) => (
                    <Country
                        key={country.alpha3Code}
                        name={country.name}
                        onClick={() => setSelectedCountryAlphaCode(country.alpha3Code)}
                    />
                ))}
            </div>
            <div className="ShowCountry">
                {selectedCountryAlphaCode === null ? (
                    <div className="ShowCountry-missing">Выберите страну</div>
                ) : (
                    <ShowCountry alpha3Code={selectedCountryAlphaCode}/>
                )}
            </div>
        </div>

    );
};

export default ChooseCountries;