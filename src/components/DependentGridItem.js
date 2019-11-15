import React from 'react';

const DependentGridItem = ({dependent}) => {
    return(
        <div className="col-lg-4 dependent-grid-item">
            <div className="dependent-grid-image"></div>
            <div className="dependent-grid-name">{dependent.firstName} {dependent.lastName}</div>
        </div>
    );
}

export default DependentGridItem;