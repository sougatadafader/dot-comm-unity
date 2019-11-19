import React from 'react';

const DonateButton = ({amount,quickDonateClick}) => {
    return(
        <button className="donate-button" type="button" data-amount={amount} onClick={(evt) => quickDonateClick(evt)}>${amount}</button>
    );
}

export default DonateButton;