import React from 'react';
import Loading from '../components/Loading';
import Header from '../components/Header';
import CampaignGrid from '../components/CampaignGrid';
import NoItem from '../components/NoItem';
import UserService from '../services/UserService';
import RequestService from '../services/RequestService';

class AllCampaigns extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loading:true,
            sessionUser:{},
            campaigns:[]
        };
    }

    componentDidMount()
    {
        this.loadData();
    }

    async loadData()
    {
        let user = await UserService.findUserInSession();
        let campaignsUrl = 'api/campaigns';
        let campaigns = await RequestService.getRequest(campaignsUrl);
        this.setState({
            loading:false,
            sessionUser:user,
            campaigns:campaigns
        });
    }

    showCampaigns()
    {
        if(this.state.campaigns.length > 0)
        {
            return(
                <CampaignGrid campaigns={this.state.campaigns} user={this.state.sessionUser} gridSize="4" />
            );
        }
        return(
            <NoItem title="List Of Campaigns" text="No Campaigns Found" />
        );
    }

    render()
    {
        if(this.state.loading)
        {
            return(
                <Loading />
            );
        }
        return(
            <div className="bigbro-container">
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {this.showCampaigns()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AllCampaigns;