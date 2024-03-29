import React from 'react';
import LikeButton from './LikeButton';
import SocialButton from './SocialButton';
const CampaignCard = ({campaign,likes,userLike,triggerLike}) => {
    let created = campaign.created;
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let createdArr = created.split('T');
    let createdDate = createdArr[0];
    let createdDateArr = createdDate.split('-');
    let dateShow = createdDateArr[2]+' '+months[createdDateArr[1]-1]+' '+createdDateArr[0];
    let imageUrl = campaign.imageUrl;
    let imageClass = "campaign-image";
    if(imageUrl == null || imageUrl == '')
    {
        imageClass = 'campaign-image no-image';
    }
    return(
        <div className="campaign-card card-ui">
            <h3 className="campaign-title">{campaign.header}</h3>
                <div className={imageClass}>
                    <img src={campaign.imageUrl} className="img-responsive" />
                </div>
                <div className="campaign-meta">
                    <p>Created {dateShow}</p>
                    <div className="campaign-social">
                        <LikeButton likesCount={likes} userLike={userLike} triggerLike={(evt) => triggerLike(evt)} />
                        <SocialButton platform="facebook" url="#" />
                        <SocialButton platform="twitter" url="#" />
                    </div>
                </div>
                <div className="campaign-description">
                    <p>{campaign.text}</p>
                </div>
        </div>
    );
}

export default CampaignCard;