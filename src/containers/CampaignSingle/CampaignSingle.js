import React from 'react';
import Header from '../../components/Header';
import CampaignCard from '../../components/CampaignCard';
import VolunteerCard from '../../components/VolunteerCard';
import SingleComment from '../../components/SingleComment';
import DonationProgress from '../../components/DonationProgress';
import RequestService from '../../services/RequestService';
import UserService from '../../services/UserService';
import DependentProfileItem from '../../components/DependentProfileItem';
import Donate from '../../components/Donate';
import DonationList from '../../components/DonationList';
import NoItem from '../../components/NoItem';
import Loading from '../../components/Loading';

class CampaignSingle extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loading:true,
            campaign:{},
            donate:{
                value:0,
                comment:''
            },
            creator:{},
            allUsers:[],
            likesCount:0,
            userLike:0,
            dpUrl:'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            comments:[
                {
                    user:"Sougata Dafader",
                    userImg:"https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    comment:"Help Me Help A Man In Need"
                },
                {
                    user:"Sougata Dafader",
                    userImg:"https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    comment:"Help Me Or Else...."
                },
                {
                    user:"Sougata Dafader",
                    userImg:"https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    comment:"Donate Now and get Free Chicken Nuggets"
                },
                
            ],
            donations:[]
        };
        this.quickDonateClick = this.quickDonateClick.bind(this);
        this.donateAmountChanged = this.donateAmountChanged.bind(this);
        this.submitDonation = this.submitDonation.bind(this);
        this.triggerLike = this.triggerLike.bind(this);
    }

    componentDidMount()
    {
        this.loadData();
    }

    async loadData()
    {
        let user = await UserService.findUserInSession();
        let campaignId = this.props.match.params.campaignId;
        let urlEnd = 'api/campaign/'+campaignId;
        let campaign = await RequestService.getRequest(urlEnd);
        if(Object.keys(campaign).length > 0)
        {
            let creator = campaign.creator;
            let urlEnd = 'api/user/'+creator;
            let creatorInfo = await RequestService.getRequest(urlEnd);
            console.log(creatorInfo);
            let allUserUrl = 'api/users';
            let allUsers = await RequestService.getRequest(allUserUrl);
            let donations = campaign.donations;
            for( let i=0;i<donations.length;i++ )
            {
                let userNumber = donations[i].userNumber;
                let donationUser = allUsers.filter(function(user){
                    return user.id === userNumber;
                });
                donations[i]["donationUser"] = donationUser[0];
            }
            console.log(donations);
            campaign.donations = donations;
            let likeUrl = 'api/campaigns/'+campaignId+'/likes/count/';
            let likesCount = await RequestService.getRequest(likeUrl);
            console.log('Likes Count = ',likesCount);
            this.setState({
                sessionUser:user,
                loading:false,
                campaign:campaign,
                creator:creatorInfo,
                allUsers:allUsers,
                likesCount:likesCount
            });
        }
    }

    quickDonateClick(evt)
    {
        //alert('Clicked');
        //console.log('Clicked');
        let target = evt.target;
        let value = target.getAttribute('data-amount');
        let donate = this.state.donate;
        donate.value = value;
        this.setState({
            donate:donate
        });
        document.querySelector('.donate-input[name="value"]').value = value;
    }

    donateAmountChanged(evt)
    {
        let target = evt.target;
        let value = target.value;
        let name = target.name;
        let donate = this.state.donate;
        donate[name] = value;
        this.setState({
            donate:donate
        });
    }

    async submitDonation(evt)
    {
        evt.preventDefault();
        let campaignId = this.props.match.params.campaignId;
        console.log("The Donate State = ",this.state.donate);
        let donateUrl = 'api/campaign/'+campaignId+'/donate';
        let donations = await RequestService.postRequest(donateUrl,this.state.donate);
        console.log('After Post Donation = ',donations);
        for( let i=0;i<donations.length;i++ )
        {
            let userNumber = donations[i].userNumber;
            let donationUser = this.state.allUsers.filter(function(user){
                return user.id === userNumber;
            });
            donations[i]["donationUser"] = donationUser[0];
        }
        let campaign = this.state.campaign;
        campaign.donations = donations;
        
        this.setState({
            campaign:campaign,
            donate:{
                value:0,
                comment:''
            }
        });
    }

    submitComment = (event) => {
        event.preventDefault();
        let comment = document.getElementById('comment-body').value;
        let obj = {
            user:'Sougata Dafader',
            userImg:'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            comment:comment
        };
        let comments = this.state.comments;
        comments.push(obj);
        this.setState({
            comments:comments
        });
        document.getElementById('comment-form').reset();
    }

    showDonations()
    {
        if(this.state.campaign.donations.length == 0)
        {
            return(
                <NoItem title="All Donations" text="No Donations On This Campaign Yet" />
            );
        }
        return(
            <DonationList donations={this.state.campaign.donations} />
        );
    }

    async triggerLike(evt)
    {
        evt.preventDefault();
        let campaignId = this.props.match.params.campaignId;
        let sessionUser = this.state.sessionUser;
        if(Object.keys(sessionUser).length > 0)
        {
            let postLikeUrl = 'api/campaign/'+campaignId+'/user/'+sessionUser.id;
            let postLike = await RequestService.postRequest(postLikeUrl,{});
            let likeUrl = 'api/campaigns/'+campaignId+'/likes/count/';
            let likesCount = await RequestService.getRequest(likeUrl);
            this.setState({
                likesCount:likesCount
            });
            console.log('Post Like = ',postLike);
            console.log("Type Of Post Like",typeof postLike);
        }
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
                <div className="container space--top">
                    <div className="row">
                        <div className="col-lg-8">
                            <CampaignCard campaign={this.state.campaign} likes={this.state.likesCount} triggerLike={this.triggerLike}/>

                            <VolunteerCard creator={this.state.creator} />
                            
                            <div className="comments-card card-ui">
                                <h3 className="comment-title">Comments</h3>
                                <div className="comment-list">
                                    {
                                        this.state.comments.map((comment,index)=>
                                            (<SingleComment key={index} user={comment.user} userImg={comment.userImg} comment={comment.comment} />)
                                        )
                                    }
                                    <div className="media single-comment comment-entry">
                                        <div className="user-dp-circle" style={{backgroundImage:`url(${this.state.dpUrl})`}}></div>
                                        <div className="media-body">
                                            <form onSubmit={this.submitComment} id="comment-form">
                                                <input type="text" id="comment-body" placeholder="Add your comment here..." />
                                                <button type="submit"><img className="img-responsive" src="https://i.imgur.com/K1bBU9s.png" /></button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="dependent-profile-card card-ui">
                                <h3 className="dependent-profile-card-title">Organized For</h3>
                                <DependentProfileItem dependent={this.state.campaign.dependent} />
                            </div>
                            <div className="donation-progress-card card-ui">
                                <h3 className="donation-progress">$10000 <span>raised of $20000 target</span></h3>
                                <DonationProgress progress="50%" />
                                <Donate user={this.state.sessionUser} val={this.state.donate} quickDonateClick={this.quickDonateClick} donateAmountChanged={this.donateAmountChanged} submitDonation={this.submitDonation} />
                            </div>
                            
                            {this.showDonations()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CampaignSingle;