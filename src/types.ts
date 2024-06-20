export interface ApiCountries {
    alpha3Code:string;
    name:string;
}

export interface ApiCountry{
    alpha3Code:string;
    name:string;
    capital:string;
    population:number;
    flags:string;
    borders:string;
}