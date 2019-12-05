import React from 'react';

const Message = ({message,closeMessage}) => {
    return(
        <div className="message-show alert alert-success alert-dismissable">
            {message}
            <button type="button" className="close" onClick={() => closeMessage()}>
                <span aria-hidden="true">x</span>
            </button>
        </div>
    );
}

export default Message;