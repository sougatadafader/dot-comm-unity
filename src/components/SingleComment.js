import React from 'react';

const SingleComment = ({user,userImg,comment}) => {
    return(
        <div className="media">
            <div className="user-dp-circle" style={{backgroundImage:`url(${userImg})`}}></div>
            <div className="media-body">
                <h5>{user}</h5>
                {comment}
            </div>
        </div>
    );
}

export default SingleComment;