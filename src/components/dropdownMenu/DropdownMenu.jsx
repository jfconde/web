import * as React from 'react';
import {
    dropdownMenu,
    dropdownMenu__expanded,
    dropdownMenu__text,
    dropdownMenu__icon,
    dropdownMenu__items,
} from './DropdownMenu.module.scss';
import Icon from '../icon/Icon';

const preventBubbling = (event) => event.stopPropagation();

const DropdownMenu = (props) => {
    const {
        className = '',
        items = [],
        text = '',
        link = '',
        target = '',
        showIcon = true,
    } = props;
    const [dropdownVisible, setDropdownVisible] = React.useState(false);
    const onTap = React.useCallback(() => {
        setDropdownVisible(true);
    }, []);

    const onSpecialKeyPress = React.useCallback(
        (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                setDropdownVisible(!dropdownVisible);
            }
        },
        [dropdownVisible],
    );

    React.useEffect(() => {
        if (dropdownVisible) {
            const globalClickListener = (event) => setDropdownVisible(false);
            document.addEventListener('click', globalClickListener);
            document.addEventListener('touchend', globalClickListener);
            return () => {
                document.removeEventListener('click', globalClickListener);
                document.removeEventListener('touchend', globalClickListener);
            };
        }
    }, [dropdownVisible]);

    const dropdownItems = React.useMemo(
        () =>
            items.map(({ link, target, text, key }) => (
                <a
                    role="listitem"
                    href={link}
                    target={target}
                    rel="noopener"
                    key={key || `${link}${text}`}
                >
                    {text}
                </a>
            )),
        [items],
    );

    return (
        <div
            role="button"
            aria-label={text}
            tabIndex={0}
            className={`${className} ${dropdownMenu}`.trim()}
            onClick={onTap}
            onKeyUp={onSpecialKeyPress}
        >
            <span className={dropdownMenu__text}>
                {link ? (
                    <a
                        tabIndex={-1}
                        onClick={preventBubbling}
                        href={link}
                        target={target}
                        rel="noopener"
                    >
                        {text}
                    </a>
                ) : (
                    text
                )}
                {showIcon && (
                    <Icon
                        className={dropdownMenu__icon}
                        onClick={onTap}
                        onTouchStart={onTap}
                        iconName={dropdownVisible ? 'up-open' : 'down-open'}
                    />
                )}
            </span>
            <ul
                className={`${dropdownMenu__items} ${
                    dropdownVisible ? dropdownMenu__expanded : ''
                }`.trim()}
            >
                {dropdownVisible && dropdownItems}
            </ul>
        </div>
    );
};

export default DropdownMenu;
