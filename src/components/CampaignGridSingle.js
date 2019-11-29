import React from 'react';
import DonationProgress from '../components/DonationProgress';

const CampaignGridSingle = ({campaign,user}) => {
    let id = campaign.id;
    let url = '/campaign/'+id+'/view';
    let text = campaign.text.substring(0,60);
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
    let editUrl = '/campaign/'+id+'/edit';
    return(
        <div className="col-lg-6 campaign-grid-single">
            <div className="campaign-grid-inner">
                <div className="campaign-grid-edit"><a href={editUrl}><i class="fa fa-edit"></i></a></div>
                <div className="campaign-grid-image" style={{backgroundImage:`url(${imageUrl})`}}><a href={url} className="campaign-image-link-wrap"></a></div>
                <div className="campaign-grid-header">
                    <h2 className="campaign-grid-title"><a href={url}>{header}</a></h2>
                </div>
                <p className="campaign-grid-desc">{text}</p>
                <DonationProgress progress="50%" />
                <h3 className="donation-progress">$10000 <span>raised of ${campaign.targetValue} target</span></h3>
            </div>
            
        </div>
    );
}

export default CampaignGridSingle;