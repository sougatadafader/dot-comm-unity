import React from 'react';

const UserDonationSingle = ({donation}) => {
    
    return(
        <div className="user-donation card-ui">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-9">
                        <div className="media user-donation-single">
                            <div className="user-dp-circle" style={{backgroundImage:`url(${donation.campaign.imageUrl})`}}></div>
                            <div className="media-body">
                                <h4>{donation.campaign.header}</h4>
                                <p>{donation.campaign.comment}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-3">
                        <h1>${donation.value}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDonationSingle;