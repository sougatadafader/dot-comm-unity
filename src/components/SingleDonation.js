import React from 'react';

const SingleDonation = ({donation}) => {
    return(
        <div className="donation-panel panel-ui">
            <div className="donation-panel-header panel-ui-header">
                <div className="media">
                    <div className="user-dp-circle half-size-dp" style={{backgroundImage:`url(${donation.userImg})`}}></div>
                    <div className="media-body">
                        <h5>{donation.user}</h5>
                        <span className="donation-detail donation-amount">{donation.amount}$</span>
                        <span className="donation-detail donation-date">{donation.date}</span>
                    </div>
                </div>
            </div>
            <div className="donation-panel-comment panel-ui-body"><strong>No Comment To Show</strong></div>
        </div>
        
    );
}

export default SingleDonation;