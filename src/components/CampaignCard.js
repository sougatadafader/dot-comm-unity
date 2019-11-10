import React from 'react';

const CampaignCard = ({title,img,createdAt,description}) => {
    return(
        <div className="campaign-card card-ui">
            <h3 className="campaign-title">{title}</h3>
                <div className="campaign-image">
                    <img src={img} className="img-responsive" />
                </div>
                <div className="campaign-meta">
                    <p>Created {createdAt}</p>
                </div>
                <div className="campaign-description">
                    <p>{description}</p>
                </div>
        </div>
    );
}

export default CampaignCard;