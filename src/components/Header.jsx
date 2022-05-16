import * as React from 'react';
import './Header.scss';
import DropdownMenu from "./dropdownMenu/DropdownMenu";
import Spacer from "./spacer/Spacer";
import Button from "./button/Button";

const aboutMeLinks = [
    {link: '/#experience', text: 'Experience', key: 0},
    {link: '/#education', text: 'Education', key: 1},
];

const Header = () => {
    return (
        <header className="header">
            <a href="/#summary" className="logo">
                <h1 >jfconde</h1>
            </a>
            <Spacer/>
            <DropdownMenu className="header-dropdown" text="Home" link="/#summary" items={aboutMeLinks}/>
            <Button className="header-button" href="/#education">Projects</Button>
            <Button className="header-button" href="/#experience">Blog</Button>
        </header>
    );
};

export default Header;
