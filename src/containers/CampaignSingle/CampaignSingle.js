import React from 'react';
import Header from '../../components/Header';
import CampaignCard from '../../components/CampaignCard';
import VolunteerCard from '../../components/VolunteerCard';
import SingleComment from '../../components/SingleComment';
import DonationProgress from '../../components/DonationProgress';
import SingleDonation from '../../components/SingleDonation';
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
            donateAmount:0,
            creator:{},
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
                donations[i]["donationUser"] = donationUser;
            }
            console.log(donations);
            this.setState({
                sessionUser:user,
                loading:false,
                campaign:campaign,
                creator:creatorInfo
            });
        }
    }

    quickDonateClick(evt)
    {
        //alert('Clicked');
        //console.log('Clicked');
        let target = evt.target;
        let value = target.getAttribute('data-amount');
        this.setState({
            donateAmount:value
        });
        document.querySelector('.donate-input').value = value;
    }

    donateAmountChanged(evt)
    {
        let target = evt.target;
        let amount = target.value;
        this.setState({
            donateAmount:amount
        });
    }

    submitDonation(evt)
    {
        evt.preventDefault();
        console.log(this.state.donateAmount);
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
        if(this.state.donations.length == 0)
        {
            return(
                <NoItem title="All Donations" text="No Donations On This Campaign Yet" />
            );
        }
        return(
            //<DonationList donations={this.state.campaign.donations} />
            <NoItem title="All Donations" text="No Donations On This Campaign Yet" />
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
                <div className="container space--top">
                    <div className="row">
                        <div className="col-lg-8">
                            <CampaignCard campaign={this.state.campaign}/>

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
                                <Donate user={this.state.sessionUser} val={this.state.donateAmount} quickDonateClick={this.quickDonateClick} donateAmountChanged={this.donateAmountChanged} submitDonation={this.submitDonation} />
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