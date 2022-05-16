import * as React from 'react';
import './style.scss';


const Logo = ({className = '', link, target, iconName = '???', ...props}) => {
    return (
        <h1 className={`logo ${className}`.trim()}><a href={link}>jfconde</a></h1>

    );
};

export default Logo;
