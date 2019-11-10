import React from 'react';

const VolunteerCard = ({volunteerName,volunteerImg,volunteerAbout}) => {
    return(
        <div className="organiser-card card-ui">
            <h3 className="volunteer-title">Organized By</h3>
            <div className="media">
                <div className="user-dp-circle" style={{backgroundImage:`url(${volunteerImg})`}}></div>
                <div className="media-body">
                    <h5>{volunteerName}</h5>
                    {volunteerAbout}
                </div>
            </div>
        </div>
    );
}

export default VolunteerCard;