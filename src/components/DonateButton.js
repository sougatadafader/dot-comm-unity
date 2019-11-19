import React from 'react';

const DonateButton = ({amount}) => {
    return(
        <button className="donate-button" type="button">${amount}</button>
    );
}

export default DonateButton;