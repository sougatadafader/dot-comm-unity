import React from 'react';

const DonateTextBox = ({inputType,val,inputName,placeholder,minValue,donateAmountChanged}) => {
    return(
        <div className="donate-input-box">
            <div className="donate-input-box-inner">
                <input type={inputType} name={inputName} placeholder={placeholder} className="donate-input" min="5" defaultValue={val} onChange={(evt) => donateAmountChanged(evt)} />
            </div>
        </div>
    );
}

export default DonateTextBox;