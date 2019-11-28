import React from 'react';

const SocialButton = ({platform,url}) => {
    let linkClass = platform+'-button social-button';
    let iconClass = 'fa fa-'+platform;
    return(
        <span className="social-button-container">
            <a href={url} className={linkClass} target="_blank"><i className={iconClass}></i></a>
        </span>
    );
}

export default SocialButton;