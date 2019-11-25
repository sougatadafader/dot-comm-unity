import React from 'react';

const UserProfileCard = ({user,sessionUser,editProfile}) => {
    let imageClass = 'user-image image-present';
    let bgImg = 'url('+user.imageUrl+')';
    if(user.imageUrl == null || user.imageUrl == '')
    {
        imageClass = 'user-image';
        bgImg = 'none';
    }
    return(
        <div className="user-profile-card card-ui">
            <div className="media user-profile">
                <div className={imageClass} style={{backgroundImage:bgImg}}></div>
                <div className="media-body">
                    <div className="user-name-container">
                        <span><strong>First Name: </strong>{user.firstName}</span>
                        <span><strong>Last Name: </strong>{user.lastName}</span>
                    </div>
                    <div className="user-about-me">
                        <p><strong>About Me:</strong></p>
                        <p>{user.aboutMe}</p>
                    </div>
                    {user.id === sessionUser.id?(<button className="btn btn-primary" style={{marginTop:20}} onClick={() => editProfile()}>Edit Profile</button>):""}
                </div>
            </div>
        </div>
    );
}

export default UserProfileCard;