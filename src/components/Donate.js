import React from 'react';
import DonateButton from '../components/DonateButton';
const Donate = ({user}) => {
    if(Object.keys(user).length == 0)
    {
        return(
            <div className="donate-btn-container">
                <a className="donate-btn" href="#">Sign In To Donate</a>
            </div>
        );
    }
    return(
        <form>
            <div className="col-lg-4">
                <DonateButton amount="30" />
            </div>
            <div className="col-lg-4">
                <DonateButton amount="50" />
            </div>
            <div className="col-lg-4">
                <DonateButton amount="100" />
            </div>
        </form>
    );
}

export default Donate;