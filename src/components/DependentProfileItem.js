import React from 'react';

const DependentProfileItem = ({dependent}) => {
    return (
        <div className="media dependent-profile-item">
            <div className="user-dp-circle" style={{backgroundImage:`url(${dependent.imageUrl})`}}></div>
            <div className="media-body">
                <h5>{dependent.firstName} {dependent.lastName}</h5>
                {dependent.landmark}
            </div>
        </div>
    );
}

export default DependentProfileItem;