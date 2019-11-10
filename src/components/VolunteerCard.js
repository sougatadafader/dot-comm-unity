import React from 'react';

const VolunteerCard = ({volunteerName,volunteerImg}) => {
    return(
        <div className="organiser-card card-ui">
            <h3 className="volunteer-title">Organized By</h3>
            <div className="media">
                <div className="user-dp-circle" style={{backgroundImage:`url(${volunteerImg})`}}></div>
                <div className="media-body">
                    <h5>{volunteerName}</h5>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </div>
            </div>
        </div>
    );
}

export default VolunteerCard;