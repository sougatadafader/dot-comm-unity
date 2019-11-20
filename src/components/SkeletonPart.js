import React from 'react';

const SkeletonPart = () => {
    return(
        <div className="media">
            <div className="skeleton-img"></div>
            <div className="media-body">
                <div className="skeleton-title"></div>
                <p className="skeleton-row"></p>
                <p className="skeleton-row"></p>
                <p className="skeleton-row"></p>
                <p className="skeleton-row"></p>
                <p className="skeleton-row"></p>
            </div>
        </div>
    );
}

export default SkeletonPart;