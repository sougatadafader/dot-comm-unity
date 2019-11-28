import React from 'react';

const LikeButton = ({likesCount,userLike,triggerLike}) => {
    let likeClass = 'like-button social-button';
    if(userLike)
    {
        likeClass = 'like-button social-button isLiked';
    }
    return(
        <span className="social-button-container">
            <span className="like-count">{likesCount}</span>
            <a href="#" className={likeClass} onClick={(evt) => triggerLike(evt)}><i className="fa fa-heart"></i></a>
        </span>
    ); 

}

export default LikeButton;