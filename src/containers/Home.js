import React, {Component} from 'react'
import Header from '../components/Header'
import WithScrollbar from "../components/CarouselWithoutScrollbar";
import "../assets/style.css";
import "../../node_modules/react-multi-carousel/lib/styles.css";
import RequestService from '../services/RequestService';
import UserService from '../services/UserService';
import Loading from '../components/Loading';
import CampaignGrid from '../components/CampaignGrid';
import NoItem from '../components/NoItem';

export default class extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            loading:true,
            campaigns:[],
            sessionUser:{},
            likedCampaigns:[]
        }
    }

    componentDidMount()
    {
        this.loadData();
    }

    async loadData()
    {
        let urlEnd = 'api/campaign/top/10';
        let campaigns = await RequestService.getRequest(urlEnd);
        let user = await UserService.findUserInSession();
        let likedCampaigns = [];
        if(Object.keys(user).length > 0)
        {
            let likedCampaignUrl = 'api/user/'+user.id+'/campaign/liked';
            likedCampaigns = await RequestService.getRequest(likedCampaignUrl);
        }
        this.setState({
            loading:false,
            campaigns:campaigns,
            sessionUser:user,
            likedCampaigns:likedCampaigns
        });
    }

    showLikedCampaigns()
    {
        if(Object.keys(this.state.sessionUser).length > 0)
        {
            if(this.state.likedCampaigns.length > 0)
            {
                return(
                    <CampaignGrid campaigns={this.state.likedCampaigns} user={this.state.sessionUser} gridSize="4" showDisabled={true} title="My Liked Campaigns" />
                );
            }
            return(
                <NoItem title="My Liked Campaigns" text="You Haven't Liked Any Campaigns Yet." />
            );
        }
        return;
    }

    render() {

        if(this.state.loading)
        {
            return(
                <Loading />
            );
        }

        return(
            <div>
                <Header/>
                <div className="container">
                    <div className="top-campaign-container">
                        <h3 className="top-campaign-title">Top Campaigns<a className="all-campaigns" href="/campaigns/all">View All Campaigns</a></h3>
                        <WithScrollbar campaigns={this.state.campaigns} user={this.state.sessionUser}/>
                    </div>
                    {this.showLikedCampaigns()}
                </div>
            </div>
        )
    }
}