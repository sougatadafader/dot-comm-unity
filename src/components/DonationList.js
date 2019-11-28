import React from 'react';
import SingleDonation from './SingleDonation';

const DonationList = ({donations}) => {
    return(
        <div className="donation-list-card card-ui">
            <h3 className="donation-list-title">All Donations</h3>
            <div className="donation-list-container">
            {
                donations.map((donation,index) =>
                    (<SingleDonation key={index} donation={donation} />)
                )
            }
            </div>
        </div>
    );
}

export default DonationList;