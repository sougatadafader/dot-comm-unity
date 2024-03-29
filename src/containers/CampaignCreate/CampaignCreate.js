import React from 'react';
import Header from '../../components/Header';
import InputControl from '../../components/InputControl';
import DropDownControl from '../../components/DropDownControl';
import UserService from '../../services/UserService';
import RequestService from '../../services/RequestService';
import CampaignGrid from '../../components/CampaignGrid';
import NoItem from '../../components/NoItem';
import DependentProfileList from '../../components/DependentProfileList';
import Message from '../../components/Message';
import Loading from '../../components/Loading';

class CampaignCreate extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loading:true,
            selectedCampaign:{
                header:'',
                text:'',
                imageUrl:'',
                targetValue:0
            },
            depId:'',
            depImageUrl:'',
            dependents:[],
            dependentOptions:[],
            dependentOptionsLoading:true,
            sessionUser:null,
            showMessage:false,
            messageToShow:''
        };
        this.createCampaign = this.createCampaign.bind(this);
        this.inputChanged = this.inputChanged.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.dropdownChanged = this.dropdownChanged.bind(this);
        this.closeMessage = this.closeMessage.bind(this);
    }
    componentDidMount()
    {
        this.loginCheck();
        document.title = "Create A Campaign";
    }
    async loginCheck()
    {
        let user = await UserService.findUserInSession();
        console.log("User is",user);
        if( Object.keys(user).length > 0 )
        {
            this.setState({
                sessionUser:user,
                loading:false
            });
            let userId = user.id;
            let depUrlEnd = 'api/user/'+userId+'/dependents';
            let dependents = await RequestService.getRequest(depUrlEnd);
            console.log('Dependents = ',dependents);
            let options = [];
            for(let i=0;i<dependents.length;i++)
            {
                let enabled = dependents[i].enabled;
                if(!enabled)
                {
                    continue;
                }
                let value = dependents[i].id;
                let displayText = dependents[i].firstName+' '+dependents[i].lastName;
                let obj ={
                    value:value,
                    displayText:displayText
                };
                options.push(obj);
            }
            this.setState({
                dependents:dependents,
                dependentOptions:options,
                dependentOptionsLoading:false
            });
            return;
        }
        window.location.href="/";
    }
    inputChanged(evt)
    {
        if(this.state.showMessage)
        {
            this.setState({
                showMessage:false,
                messageToShow:''
            });
        }
        const value = evt.target.value;
        const name = evt.target.name;
        let selectedCampaign = this.state.selectedCampaign;
        selectedCampaign[name] = value;
        this.setState({
            selectedCampaign:selectedCampaign
        });
    }

    dropdownChanged(evt)
    {
        if(this.state.showMessage)
        {
            this.setState({
                showMessage:false,
                messageToShow:''
            });
        }
        const value = evt.target.value;
        const name = evt.target.name;
        let dependents = this.state.dependents;
        let imageUrl = '';
        if(value != '' && value != null)
        {
            let dependent = dependents.filter(function(dep){
                return dep.id == value;
            });
            imageUrl = dependent[0].imageUrl;
            console.log('Image URL = ',imageUrl);
        }
        this.setState({
            [name]:value,
            depImageUrl:imageUrl
        });
    }

    async createCampaign(evt)
    {
        evt.preventDefault();
        console.log("Campaign",this.state.selectedCampaign);
        console.log("Dependent ID",this.state.depId);
        let url = 'api/dependent/'+this.state.depId+'/campaign';
        let campaign = await RequestService.postRequest(url,this.state.selectedCampaign);
        console.log("Created Campaign",campaign);
        let user = this.state.sessionUser;
        user.campaigns.push(campaign);
        document.getElementById('create-campaign-form').reset();
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.setState({
            selectedCampaign:{
                header:'',
                text:'',
                imageUrl:'',
                targetValue:0
            },
            sessionUser:user,
            depId:'',
            depImageUrl:'',
            showMessage:true,
            messageToShow:'Campaign Created Successfully !!!'
        });
    }

    async refreshList(evt)
    {
        evt.preventDefault();
        this.setState({
            dependentOptionsLoading:true
        });
        let user = this.state.sessionUser;
        let userId = user.id;
        let depUrlEnd = 'api/user/'+userId+'/dependents';
        let dependents = await RequestService.getRequest(depUrlEnd);
        let options = [];
        for(let i=0;i<dependents.length;i++)
        {
            let value = dependents[i].id;
            let displayText = dependents[i].firstName+' '+dependents[i].lastName;
            let obj ={
                value:value,
                displayText:displayText
            };
            options.push(obj);
        }
        this.setState({
            dependentOptions:options,
            dependentOptionsLoading:false
        });
    }

    showCampaigns()
    {
        if(this.state.sessionUser.campaigns.length > 0)
        {
            let showDisabled = true;
            return(
                <CampaignGrid campaigns={this.state.sessionUser.campaigns} user={this.state.sessionUser} showDisabled={showDisabled} />
            );
        }
        return(
            <NoItem title="List of Campaigns" text="No Campaigns To Show. Create one now" />
        );
    }

    showMessage()
    {
        if(this.state.showMessage)
        {
            return(
                <Message message={this.state.messageToShow} closeMessage={this.closeMessage} />
            );
        }
        return;
    }

    closeMessage()
    {
        this.setState({
            showMessage:false,
            messageToShow:''
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
                <div className="container space--top">
                    <div className="row">
                        <div className="col-lg-8">
                            {this.showMessage()}
                            <div className="campaign-create-card card-ui">
                                <h3 className="campaign-create-title">Create A Campaign</h3>
                                <form onSubmit={this.createCampaign} id="create-campaign-form">
                                    <DropDownControl
                                        name="depId"
                                        title="Dependent"
                                        val={this.state.depId}
                                        values={this.state.dependentOptions}
                                        imageUrl={this.state.depImageUrl}
                                        addMoreValues="/dependent/create"
                                        refreshList={this.refreshList}
                                        loadingList={this.state.dependentOptionsLoading}
                                        dropdownChanged={this.dropdownChanged}
                                    />
                                    <InputControl
                                        label="Title"
                                        type="text"
                                        name="header"
                                        placeholder="Campaign Title"
                                        val={this.state.selectedCampaign.header}
                                        inputChanged={this.inputChanged}
                                    />
                                    <InputControl
                                        label="Description"
                                        type="textarea"
                                        name="text"
                                        placeholder="Campaign Description"
                                        val={this.state.selectedCampaign.text}
                                        inputChanged={this.inputChanged}
                                    />
                                    <InputControl
                                        label="Image URL"
                                        type="text"
                                        name="imageUrl"
                                        placeholder="Image URL"
                                        val={this.state.selectedCampaign.imageUrl}
                                        inputChanged={this.inputChanged}
                                    />
                                    <InputControl
                                        label="Target Value"
                                        type="number"
                                        name="targetValue"
                                        placeholder="Target Value in USD. Example: 10000"
                                        val={this.state.selectedCampaign.targetValue}
                                        inputChanged={this.inputChanged}
                                    />
                                    <button type="submit" className="btn btn-primary">Create</button>
                                </form>
                            </div>
                            {this.showCampaigns()}
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

export default CampaignCreate;