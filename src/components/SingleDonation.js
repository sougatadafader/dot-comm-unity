import React from 'react';

const SingleDonation = ({donation}) => {
    return(
        <div className="media">
            <div className="user-dp-circle" style={{backgroundImage:`url(${donation.userImg})`}}></div>
            <div className="media-body">
                <h5>{donation.user}</h5>
                <span className="donation-detail donation-amount">{donation.amount}$</span>
                <span className="donation-detail donation-date">{donation.date}</span>
            </div>
        </div>
    );
}

export default SingleDonation;