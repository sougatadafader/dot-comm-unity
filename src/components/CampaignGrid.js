import React from 'react';
import CampaignGridSingle from './CampaignGridSingle';

const CampaignGrid = ({campaigns,user,gridSize,showDisabled,title}) => {
    let showTitle = 'Your Campaigns';
    if(title != null)
    {
        showTitle = title;
    }
    return(
        <div className="campaign-list-container">
            <h3 className="campaign-list-title">{showTitle}</h3>
            <div className="container-fluid">
                <div className="row">
                    {
                        campaigns.map((campaign,index) =>
                            (<CampaignGridSingle key={index} campaign={campaign} user={user} gridSize={gridSize} showDisabled={showDisabled} />)
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default CampaignGrid;