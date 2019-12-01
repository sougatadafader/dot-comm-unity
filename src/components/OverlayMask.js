import React from 'react';

const OverlayMask = ({color,opacity}) => {
    return(
        <div className="overlay-mask" style={{backgroundColor:color,opacity:opacity}}></div>
    );
}

export default OverlayMask