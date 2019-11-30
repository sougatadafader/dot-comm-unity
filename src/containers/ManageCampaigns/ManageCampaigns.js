import React from 'react';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import CampaignGrid from '../../components/CampaignGrid';
import NoItem from '../../components/NoItem';
import RequestService from '../../services/RequestService';
import UserService from '../../services/UserService';

class ManageCampaigns extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loading:true,
            sessionUser:{}
        }
    }

    componentDidMount()
    {

    }

    async loadData()
    {
        let user = UserService.findUserInSession();
        if(Object.keys(user).length > 0)
        {
            this.setState({
                loading:false,
                sessionUser:user
            });
        }
        window.location.href='/';
    }

    showCampaigns()
    {
        if(this.state.sessionUser.campaigns.length > 0)
        {
            return(
                <CampaignGrid campaigns={this.state.sessionUser.campaigns} user={this.state.sessionUser} gridSize="4" />
            );
        }
        return(
            <NoItem title="List Of Campaigns" text="No Campaigns Created Yet." />
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

export default ManageCampaigns;