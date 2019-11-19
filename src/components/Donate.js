import React from 'react';
import DonateButton from '../components/DonateButton';
import DonateTextBox from './DonateTextBox';
const Donate = ({user,val,quickDonateClick,donateAmountChanged,submitDonation}) => {
    if(Object.keys(user).length == 0)
    {
        return(
            <div className="donate-btn-container">
                <a className="donate-btn" href="#">Sign In To Donate</a>
            </div>
        );
    }
    return(
        <form className="donation-form" onSubmit={(evt) => submitDonation(evt)}>
            <div className="row">
                <div className="col-lg-4 donate-button-container">
                    <DonateButton amount="30" quickDonateClick={(evt) => quickDonateClick(evt)} />
                </div>
                <div className="col-lg-4 donate-button-container">
                    <DonateButton amount="50" quickDonateClick={(evt) => quickDonateClick(evt)} />
                </div>
                <div className="col-lg-4 donate-button-container">
                    <DonateButton amount="100" quickDonateClick={(evt) => quickDonateClick(evt)} />
                </div>
                <div className="col-lg-12 donate-button-container">
                    <DonateTextBox val={val} donateAmountChanged={(evt) => donateAmountChanged(evt)} />
                </div>
                <div className="col-lg-12 donate-btn-container">
                    <button className="donate-btn">Donate Now</button>
                </div>
            </div>
        </form>
    );
}

export default Donate;