import React from 'react';

const NoItem = ({title,text}) => {
    return(
        <div className="no-item-card card-ui">
            <h3 className="no-item-title">{title}</h3>
            <p>
                <img className="not-found-image" src="https://i.imgur.com/UCasdje.png"/>
            </p>
            <p className="text-center">{text}</p>
        </div>
    );
}

export default NoItem;