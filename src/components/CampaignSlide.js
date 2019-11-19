import React from 'react';
import DonationProgress from '../components/DonationProgress';

const CampaignSlide = ({campaign}) => {
    let id = campaign.id;
    let url = '/campaign/'+id+'/view';
    return(
        <div className="campaign-grid-single">
            <div className="campaign-grid-inner">
                <div className="campaign-grid-image" style={{backgroundImage:`url(${campaign.imageUrl})`}}></div>
                <div className="campaign-grid-header">
                    <h2 className="campaign-grid-title"><a href={url}>{campaign.header}</a></h2>
                </div>
                <p className="campaign-grid-desc">{campaign.text}</p>
                <DonationProgress progress="50%" />
                <h3 className="donation-progress">$10000 <span>raised of $20000 target</span></h3>
            </div>
            
        </div>
    );
}

export default CampaignSlide;