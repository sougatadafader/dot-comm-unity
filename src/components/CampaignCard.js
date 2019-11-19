import React from 'react';

const CampaignCard = ({campaign}) => {
    return(
        <div className="campaign-card card-ui">
            <h3 className="campaign-title">{campaign.header}</h3>
                <div className="campaign-image">
                    <img src={campaign.imageUrl} className="img-responsive" />
                </div>
                <div className="campaign-meta">
                    <p>Created 25 October 2019</p>
                </div>
                <div className="campaign-description">
                    <p>{campaign.text}</p>
                </div>
        </div>
    );
}

export default CampaignCard;