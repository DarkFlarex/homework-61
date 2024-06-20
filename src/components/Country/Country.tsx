import React from 'react';

export interface Props {
    name:string;
    onClick: React.MouseEventHandler;
}

const Countries:React.FC<Props> = ({name,onClick}) => {
    return (
        <span className="country" onClick={onClick}>
            {name}
        </span>
    );
};

export default Countries;