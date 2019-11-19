import React from 'react';

const DonateTextBox = ({val}) => {
    return(
        <div className="donate-input-box">
            <div className="donate-input-box-inner">
                <input type="number" className="donate-input" defaultValue={val} />
            </div>
        </div>
    );
}

export default DonateTextBox;