import React from 'react';

const DependentGridItem = ({dependent}) => {
    return(
        <div className="col-lg-12 dependent-grid-item">
            <div className="dependent-grid-edit"><i class="fa fa-edit"></i></div>
            <div className="dependent-grid-image" style={{backgroundImage:`url(${dependent.imageUrl})`}}></div>
            <div className="dependent-grid-details">
                <div className="dependent-grid-details-inner">
                    <p>Name: <strong>{dependent.firstName} {dependent.lastName}</strong></p>
                    <p>Landmark: <strong>{dependent.landmark}</strong></p>
                    <p>Zipcode: <strong>{dependent.zipcode}</strong></p>
                </div>
            </div>
            <div className="clear"></div>
        </div>
    );
}

export default DependentGridItem;