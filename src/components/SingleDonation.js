import React from 'react';

const SingleDonation = ({donation}) => {
    let created = donation.created;
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let createdArr = created.split('T');
    let createdDate = createdArr[0];
    let createdDateArr = createdDate.split('-');
    let dateShow = createdDateArr[2]+' '+months[createdDateArr[1]-1]+' '+createdDateArr[0];
    let comment = donation.comment;
    if( comment == null || comment == '' )
    {
        comment = "No Comment To Show";
    }
    return(
        <div className="donation-panel panel-ui">
            <div className="donation-panel-header panel-ui-header">
                <div className="media">
                    <div className="user-dp-circle half-size-dp" style={{backgroundImage:`url(${donation.donationUser.imageUrl})`}}></div>
                    <div className="media-body">
                        <h5>{donation.donationUser.firstName} {donation.donationUser.lastName}</h5>
                        <span className="donation-detail donation-amount">{donation.value}$</span>
                        <span className="donation-detail donation-date">{dateShow}</span>
                    </div>
                </div>
            </div>
            <div className="donation-panel-comment panel-ui-body"><strong>{comment}</strong></div>
        </div>
        
    );
}

export default SingleDonation;