import * as React from 'react';
import {button} from './Button.module.scss';
import Icon from "../icon/Icon";


const Button = ({className = '', iconName, target, iconClassName, children, ariaLabel, onClick, href, ...props}) => {
    const handleClick = React.useCallback((event) => {
        if (href) {
            const a = document.createElement('a');
            a.setAttribute('href', href);
            a.setAttribute('rel', 'noopener');
            if (target) {
                a.setAttribute('target', target);
            }
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else if (onClick) {
            onClick(event);
        }
    }, [onClick, href]);

    const icon = iconName && (
        <span className="button__icon">
            <Icon className={iconClassName} iconName={iconName}/>
        </span>
    );

    const _ariaLabel = ariaLabel || typeof (children) === 'string' ? children : 'Button';

    return (
        <span
            tabIndex={0} role="button"
            aria-label={_ariaLabel} onClick={handleClick}
            className={`${button} ${className}`.trim()} {...props}
        >
            {icon}
            <span className="button__text">{children}</span>
        </span>
    );
};

export default Button;
