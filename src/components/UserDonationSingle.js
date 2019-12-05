import React from 'react';
import RequestService from '../services/RequestService';
const UserDonationSingle = ({donation}) => {
    let comment = donation.comment;
    if( comment == null || comment == '' )
    {
        comment = 'No Comments Made';
    }
    return(
        <div className="user-donation card-ui">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-9">
                        <div className="media user-donation-single">
                            <div className="user-dp-circle" style={{backgroundImage:`url(${donation.campaign.imageUrl})`}}></div>
                            <div className="media-body">
                                <h4 className="donation-history-campaign-header">{donation.campaign.header}</h4>
                                <h6 className="donation-history-donation-date"><strong>{RequestService.calculateDate(donation.created)}</strong></h6>
                                <p>{comment}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <h1 className="text-center">${donation.value}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDonationSingle;