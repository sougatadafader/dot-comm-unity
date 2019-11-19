import React from 'react';
import Header from '../../components/Header';
import CampaignCard from '../../components/CampaignCard';
import VolunteerCard from '../../components/VolunteerCard';
import SingleComment from '../../components/SingleComment';
import DonationProgress from '../../components/DonationProgress';
import SingleDonation from '../../components/SingleDonation';
import RequestService from '../../services/RequestService';

class CampaignSingle extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loading:true,
            campaign:{},
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
            donations:[
                {
                    user:'Sougata Dafader',
                    userImg:'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    amount:'1000',
                    date:'2 Nov 2019'
                },
                {
                    user:'Sougata Dafader',
                    userImg:'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    amount:'4000',
                    date:'2 Nov 2019'
                },
                {
                    user:'Sougata Dafader',
                    userImg:'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    amount:'4000',
                    date:'2 Nov 2019'
                },
                {
                    user:'Sougata Dafader',
                    userImg:'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    amount:'1000',
                    date:'2 Nov 2019'
                }
            ]
        };
    }

    componentDidMount()
    {
        this.loadCampaign();
    }

    async loadCampaign()
    {
        let campaignId = this.props.match.params.campaignId;
        let urlEnd = 'api/campaign/'+campaignId;
        let campaign = await RequestService.getRequest(urlEnd);
        if(Object.keys(campaign).length > 0)
        {
            let creator = campaign.creator;
            let urlEnd = 'api/user/'+creator;
            let creatorInfo = await RequestService.getRequest(urlEnd);
            console.log(creatorInfo);
            this.setState({
                loading:false,
                campaign:campaign
            });
        }
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

    render()
    {
        if(this.state.loading)
        {
            return(
                <div />
            );
        }
        return(
            <div className="bigbro-container">
                <Header />
                <div className="container space--top">
                    <div className="row">
                        <div className="col-lg-8">
                            <CampaignCard campaign={this.state.campaign}/>

                            <VolunteerCard
                                volunteerName="Sougata Dafader"
                                volunteerImg={this.state.dpUrl}
                                volunteerAbout="Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus."
                            />
                            
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
                            <div className="donation-progress-card card-ui">
                                <h3 className="donation-progress">$10000 <span>raised of $20000 target</span></h3>
                                <DonationProgress progress="50%" />
                                <div className="donate-btn-container">
                                    <a className="donate-btn" href="#">Donate now</a>
                                </div>
                            </div>
                            <div className="donation-list-card card-ui">
                                <h3 className="donation-list-title">All Donations</h3>
                                <div className="donation-list-container">
                                    {
                                        this.state.donations.map((donation,index) =>
                                            (<SingleDonation key={index} donation={donation} />)
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CampaignSingle;