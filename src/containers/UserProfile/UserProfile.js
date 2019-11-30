import React from 'react';
import Loading from '../../components/Loading';
import RequestService from '../../services/RequestService';
import UserService from '../../services/UserService';
import Header from '../../components/Header';
import UserProfileCard from '../../components/UserProfileCard';
import CampaignGrid from '../../components/CampaignGrid';
import DependentProfileList from '../../components/DependentProfileList';
import UserEditForm from '../../components/UserEditForm';
import NoItem from '../../components/NoItem';
class UserProfile extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loading:true,
            user:{},
            sessionUser:{},
            dependents:[],
            isEdit:false,
            editUser:{}
        };
        this.inputChanged = this.inputChanged.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.submitEditProfile = this.submitEditProfile.bind(this);
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
        let editUser = {
            username:loggedInUser.username,
            firstName:loggedInUser.firstName,
            lastName:loggedInUser.lastName,
            password:loggedInUser.password,
            imageUrl:loggedInUser.imageUrl,
            email:loggedInUser.email,
            aboutMe:loggedInUser.aboutMe
        };
        this.setState({
            user:user,
            sessionUser:loggedInUser,
            dependents:dependents,
            editUser:editUser,
            loading:false
        });
    }

    editProfile()
    {
        this.setState({
            isEdit:true
        });
    }

    inputChanged(evt)
    {
        const value = evt.target.value;
        const name = evt.target.name;
        let editUser = this.state.editUser;
        editUser[name] = value;
        this.setState({
            editUser:editUser
        });
    }

    async submitEditProfile(evt)
    {
        evt.preventDefault();
        let editUser = this.state.editUser;
        let userId = this.state.sessionUser.id;
        let urlEnd = 'api/user/'+userId;
        let updatedUser = await RequestService.putRequest(urlEnd,editUser);
        console.log('Updated User',updatedUser);
        this.setState({
            user:updatedUser,
            sessionUser:updatedUser,
            isEdit:false
        });
    }

    showCampaigns()
    {
        if(this.state.user.campaigns.length > 0)
        {
            return(
                <CampaignGrid campaigns={this.state.user.campaigns} user={this.state.sessionUser} />
            );
        }
        return(
            <NoItem title="List of Campaigns" text="No Campaigns To Show. Create one now" />
        );
    }

    showDependents()
    {
        if(this.state.dependents.length > 0)
        {
            return(
                <DependentProfileList dependents={this.state.dependents} />
            );
        }
        return(
            <NoItem title="List of Dependents" text="No Dependents To Show. Create one now" />
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
                        <div className="col-lg-8">
                            {!this.state.isEdit?(<UserProfileCard user={this.state.user} sessionUser={this.state.sessionUser} editProfile={this.editProfile} />):(<UserEditForm user={this.state.editUser} inputChanged={this.inputChanged} submitEditProfile={this.submitEditProfile} />)}
                            {this.showCampaigns()}
                        </div>
                        <div className="col-lg-4">
                            {this.showDependents()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfile;