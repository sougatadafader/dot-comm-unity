import React from 'react';

const SingleDonation = ({donation}) => {
    let created = donation.created;
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let createdArr = created.split('T');
    let createdDate = createdArr[0];
    let createdDateArr = createdDate.split('-');
    let dateShow = createdDateArr[2]+' '+months[createdDateArr[1]-1]+' '+createdDateArr[0];
    let comment = donation.comment;
    if( comment == null || comment == '' )
    {
        comment = "No Comment To Show";
    }
    if(donation.donationUser == null)
    {
        donation.donationUser = {};
    }
    let userId = donation.donationUser.id;
    let userUrl = '/user/'+userId+'/view';
    return(
        <div className="donation-panel panel-ui">
            <a href={userUrl} className="donation-link-mask"></a>
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