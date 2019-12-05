import React from 'react';

const UserDonationSingle = ({donation}) => {
    
    return(
        <div className="user-donation alt-card-ui">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-9">
                        <div className="media user-donation-single">
                            <div className="user-dp-circle" style={{backgroundImage:`url(${donation.imageUrl})`}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDonationSingle;