import React from 'react';

const MobileMenu = ({showMenu,toggleMobileMenu}) => {
    let menuClass = 'mobile-menu';
    if(showMenu)
    {
        menuClass = 'mobile-menu show-mobile-menu'
    }
    return(
        <div className={menuClass}>
            <div className="mobile-menu-container">
                <a className="close-mobile-menu" href="#" onClick={(evt) => toggleMobileMenu(evt)}>x</a>
            </div>
        </div>
    );
}

export default MobileMenu;