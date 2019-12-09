import React from 'react';

const MobileMenu = ({showMenu}) => {
    let menuClass = 'mobile-menu';
    if(showMenu)
    {
        menuClass = 'mobile-menu show-mobile-menu'
    }
    return(
        <div className={menuClass} />
    );
}

export default MobileMenu;