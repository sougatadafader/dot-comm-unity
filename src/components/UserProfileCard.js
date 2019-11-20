import React from 'react';

const UserProfileCard = ({user,sessionUser,editProfile}) => {

    return(
        <div className="user-profile-card card-ui">
            <div className="media user-profile">
                <div className="user-image"></div>
                <div className="media-body">
                    <div className="user-name-container">
                        <span><strong>First Name: </strong>{user.firstName}</span>
                        <span><strong>Last Name: </strong>{user.lastName}</span>
                    </div>
                    <div className="user-about-me">
                        <p><strong>About Me:</strong></p>
                        <p>{user.aboutMe}</p>
                    </div>
                    {user.id === sessionUser.id?(<button className="btn btn-primary" onClick={() => editProfile()}>Edit Profile</button>):""}
                </div>
            </div>
        </div>
    );
}

export default UserProfileCard;