import React from 'react';

const DonateButton = ({amount}) => {
    return(
        <button className="donate-btn" type="button">${amount}</button>
    );
}

export default DonateButton;