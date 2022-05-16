import * as React from 'react';
import '../../scss/icon-font.scss';

const Icon = ({className = '', iconName = '???', ...props}) => {
    return (
        <span className={`icon icon-${iconName} ${className}`.trim()} {...props}></span>
    );
};

export default Icon;
