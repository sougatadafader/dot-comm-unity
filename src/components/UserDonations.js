import React from 'react';
import UserDonationSingle from './UserDonationSingle';
const UserDonations = ({donations}) => {

    return(
        <div className="user-donations-container">
            <h3 className="donation-history-title">Donation History</h3>
            <div className="user-donations">
                {
                    donations.map((donation,index) =>
                        (<UserDonationSingle key={index} donation={donation} />)
                    )
                }
            </div>
        </div>
    );
};

export default UserDonations;