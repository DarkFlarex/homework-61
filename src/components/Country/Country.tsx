import React from 'react';
import "./Country.css";

export interface Props {
    name:string;
    onClick: React.MouseEventHandler;
}

const Country:React.FC<Props> = ({name,onClick}) => {
    return (
        <a href="#" className="country" onClick={onClick}>
            {name}
        </a>
    );
};

export default Country;