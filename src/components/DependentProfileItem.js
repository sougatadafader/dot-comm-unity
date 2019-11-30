import React from 'react';

const DependentProfileItem = ({dependent}) => {
    let image = 'https://i.imgur.com/Spvo1kl.jpg';
    if(dependent.imageUrl !=null && dependent.imageUrl != '')
    {
        image = dependent.imageUrl;
    }
    return (
        <div className="media dependent-profile-item">
            <div className="user-dp-circle" style={{backgroundImage:`url(${image})`}}></div>
            <div className="media-body">
                <h5>{dependent.firstName} {dependent.lastName}</h5>
                {dependent.landmark}
            </div>
        </div>
    );
}

export default DependentProfileItem;