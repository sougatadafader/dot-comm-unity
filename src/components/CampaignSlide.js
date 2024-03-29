import React from 'react';
import DonationProgress from '../components/DonationProgress';
import RequestService from '../services/RequestService';

const CampaignSlide = ({campaign,user,showDisabled}) => {
    if((!showDisabled || showDisabled == null) && !campaign.enabled)
    {
        return '';
    }
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
    let campaignId = campaign.id;
    let editUrl = '/campaign/'+campaignId+'/edit';
    let donation = RequestService.calculateDonation(campaign);
    return(
        <div className="campaign-grid-single">
            <div className="campaign-grid-inner">
                {user.id == campaign.creator ? (<div className="campaign-grid-edit"><a href={editUrl}><i class="fa fa-edit"></i></a></div>):''}
                <div className="campaign-grid-image" style={{backgroundImage:`url(${imageUrl})`}}><a href={url} className="campaign-image-link-wrap"></a></div>
                <div className="campaign-grid-header">
                    <h2 className="campaign-grid-title"><a href={url}>{header}</a></h2>
                </div>
                <p className="campaign-grid-desc">{text}</p>
                <DonationProgress progress={donation.percentText} />
                <h3 className="donation-progress">${donation.totalDonation} <span>raised of ${campaign.targetValue} target</span></h3>
            </div>
            
        </div>
    );
}

export default CampaignSlide;