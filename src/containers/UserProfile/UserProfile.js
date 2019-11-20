import React from 'react';
import Loading from '../../components/Loading';
import RequestService from '../../services/RequestService';
import UserService from '../../services/UserService';
import Header from '../../components/Header';
import UserProfileCard from '../../components/UserProfileCard';
import CampaignGrid from '../../components/CampaignGrid';
import DependentProfileList from '../../components/DependentProfileList';

class UserProfile extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loading:true,
            user:{},
            sessionUser:{},
            dependents:[]
        };
    }
    componentDidMount()
    {
        this.loadData();
    }

    async loadData()
    {
        let userId = this.props.match.params.userId;
        let userUrl = 'api/user/'+userId;
        let user = await RequestService.getRequest(userUrl);
        let depUrlEnd = 'api/user/'+userId+'/dependents';
        let dependents = await RequestService.getRequest(depUrlEnd);
        let loggedInUser = await UserService.findUserInSession();
        this.setState({
            user:user,
            sessionUser:loggedInUser,
            dependents:dependents,
            loading:false
        });
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
                        <div className="col-lg-8">
                            <UserProfileCard user={this.state.user} sessionUser={this.state.sessionUser} />
                            <CampaignGrid campaigns={this.state.user.campaigns} />
                        </div>
                        <div className="col-lg-4">
                            <DependentProfileList dependents={this.state.dependents} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfile;