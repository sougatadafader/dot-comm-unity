import React from 'react';
import DonationProgress from '../components/DonationProgress';

const CampaignGridSingle = ({campaign}) => {
    let id = campaign.id;
    let url = '/campaign/'+id+'/view';
    let text = campaign.text.substring(0,20);
    let header = campaign.header;
    let imageUrl = campaign.imageUrl;
    if( header == null || header == '' )
    {
        header = 'No Title';
    }
    if(imageUrl == null || imageUrl == '')
    {
        imageUrl = 'https://images.unsplash.com/photo-1495427513693-3f40da04b3fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80';
    }
    return(
        <div className="col-lg-6 campaign-grid-single">
            <div className="campaign-grid-inner">
                <div className="campaign-grid-image" style={{backgroundImage:`url(${imageUrl})`}}></div>
                <div className="campaign-grid-header">
                    <h2 className="campaign-grid-title"><a href={url}>{header}</a></h2>
                </div>
                <p className="campaign-grid-desc">{text}</p>
                <DonationProgress progress="50%" />
                <h3 className="donation-progress">$10000 <span>raised of $20000 target</span></h3>
            </div>
            
        </div>
    );
}

export default CampaignGridSingle;