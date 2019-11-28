import React from 'react';

const SocialButton = ({platform}) => {
    let linkClass = platform+'-button social-button';
    let iconClass = 'fa fa-'+platform;
    let url = window.location.href;
    if(platform == 'facebook')
    {
        url = 'https://facebook.com/sharer/sharer.php?u='+encodeURIComponent(url);
    }
    else if(platform == 'twitter')
    {
        url = 'https://twitter.com/intent/tweet?url='+encodeURIComponent(url);
    }
    return(
        <span className="social-button-container">
            <a href={url} className={linkClass} target="_blank"><i className={iconClass}></i></a>
        </span>
    );
}

export default SocialButton;