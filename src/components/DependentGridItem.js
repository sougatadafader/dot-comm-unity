import React from 'react';

const DependentGridItem = ({dependent}) => {
    return(
        <div className="col-lg-6 dependent-grid-item">
            <div className="dependent-grid-image" style={{backgroundImage:`url(${dependent.imageUrl})`}}></div>
            <div className="dependent-grid-details">
                
            </div>
            <div className="clear"></div>
        </div>
    );
}

export default DependentGridItem;