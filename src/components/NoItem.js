import React from 'react';

const NoItem = ({title,text}) => {
    return(
        <div className="no-item-card card-ui">
            <h3 className="no-item-title">{title}</h3>
            <p>{text}</p>
        </div>
    );
}

export default NoItem;