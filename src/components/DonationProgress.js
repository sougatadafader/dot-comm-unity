import React from 'react';

const DonationProgress = ({progress}) => {
    return(
        <div className="progress">
            <div className="progress-bar" role="progress-bar" style={{width:progress}}></div>
        </div>
    );
}

export default DonationProgress;