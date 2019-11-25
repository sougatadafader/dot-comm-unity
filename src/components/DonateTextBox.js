import React from 'react';

const DonateTextBox = ({val,donateAmountChanged}) => {
    return(
        <div className="donate-input-box">
            <div className="donate-input-box-inner">
                <input type="number" className="donate-input" min="5" defaultValue={val} onChange={(evt) => donateAmountChanged(evt)} />
            </div>
        </div>
    );
}

export default DonateTextBox;