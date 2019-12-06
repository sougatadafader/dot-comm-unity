import React from 'react';
import DonationProgress from '../components/DonationProgress';
import OverlayMask from './OverlayMask';

const CampaignGridSingle = ({campaign,user,gridSize,showDisabled}) => {
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
    let editUrl = '/campaign/'+id+'/edit';
    let donations = campaign.donations;
    if( donations == null )
    {
        donations = [];
    }
    let totalDonation = 0;
    for(let i=0;i<donations.length;i++)
    {
        let value = donations[i].value;
        totalDonation += value;
    }
    let targetValue = parseInt(campaign.targetValue);
    let percent = 100;
    if(totalDonation < targetValue)
    {
        percent = (totalDonation/targetValue).toFixed(2);
        percent = percent*100;
    }
    let percentText = percent+'%';
    let gridClass = 'col-lg-6 campaign-grid-single';
    if(gridSize != null)
    {
        gridClass = 'col-lg-'+gridSize+' campaign-grid-single';
    }
    return(
        <div className={gridClass}>
            <div className="campaign-grid-inner">
                {!campaign.enabled && showDisabled ? (<OverlayMask color="#000" opacity="0.6" />):''}
                {user.id == campaign.creator ? (<div className="campaign-grid-edit"><a href={editUrl}><i class="fa fa-edit"></i></a></div>):''}
                <div className="campaign-grid-image" style={{backgroundImage:`url(${imageUrl})`}}><a href={url} className="campaign-image-link-wrap"></a></div>
                <div className="campaign-grid-header">
                    <h2 className="campaign-grid-title"><a href={url}>{header}</a></h2>
                </div>
                <p className="campaign-grid-desc">{text}</p>
                <DonationProgress progress={percentText} />
                <h3 className="donation-progress">${totalDonation} <span>raised of ${campaign.targetValue} target</span></h3>
            </div>
            
        </div>
    );
}

export default CampaignGridSingle;