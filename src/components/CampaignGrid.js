import React from 'react';
import CampaignGridSingle from './CampaignGridSingle';

const CampaignGrid = ({campaigns}) => {
    return(
        <div className="campaign-list-container">
            <h3 className="campaign-list-title">List Of Campaigns</h3>
            <div className="container-fluid">
                <div className="row">
                    {
                        campaigns.map((campaign,index) =>
                            (<CampaignGridSingle key={index} campaign={campaign} />)
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default CampaignGrid;