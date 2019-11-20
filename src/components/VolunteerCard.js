import React from 'react';

const VolunteerCard = ({creator}) => {
    let creatorName = creator.firstName+" "+creator.lastName;
    let creatorImg = creator.imageUrl;
    let bgImg = 'url('+creatorImg+')';
    let imageClass = 'user-dp-circle';
    let href = '/user/'+creator.id+'/view';
    if(creatorName == null || creatorName == '')
    {
        creatorName = 'No Name';
    }
    if(creatorImg == null || creatorImg == '')
    {
        bgImg = 'none';
        imageClass ='user-no-img';
    }
    return(
        <div className="organiser-card card-ui">
            <h3 className="volunteer-title">Organized By</h3>
            <div className="media">
                <div className={imageClass} style={{backgroundImage:bgImg}}><a className="volunteer-image-link-wrap" href={href}></a></div>
                <div className="media-body">
                    <h5><a href={href}>{creatorName}</a></h5>
                    {creator.aboutMe}
                </div>
            </div>
        </div>
    );
}

export default VolunteerCard;