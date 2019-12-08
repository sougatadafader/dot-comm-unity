import React from 'react';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import InputControl from '../../components/InputControl';
import BooleanSelectBoxControl from '../../components/BooleanSelectBoxControl';
import CampaignGrid from '../../components/CampaignGrid';
import NoItem from '../../components/NoItem';
import DependentProfileList from '../../components/DependentProfileList';
import DependentProfileItem from '../../components/DependentProfileItem';
import Message from '../../components/Message';
import UserService from '../../services/UserService';
import RequestService from '../../services/RequestService';
import './CampaignEdit.css';

class CampaignEdit extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loading:true,
            sessionUser:{},
            selectedCampaign:{
                header:'',
                text:'',
                imageUrl:'',
                targetValue:0,
                enabled:true
            },
            dependents:[],
            showMessage:false,
            messageToShow:''
        };
        this.editCampaign = this.editCampaign.bind(this);
        this.inputChanged = this.inputChanged.bind(this);
        this.booleanSelectChanged = this.booleanSelectChanged.bind(this);
        this.findCampaign = this.findCampaign.bind(this);
        this.closeMessage = this.closeMessage.bind(this);
    }

    componentDidMount()
    {
        this.loadData();
    }

    async loadData()
    {
        let user = await UserService.findUserInSession();
        if(Object.keys(user).length > 0)
        {
            let campaignId = this.props.match.params.campaignId;
            let campaignUrl = 'api/campaign/'+campaignId;
            let campaign = await RequestService.getRequest(campaignUrl);
            if( campaign.creator != user.id )
            {
                window.location.href='/';
                return;
            }
            let selectedCampaign = {
                header:campaign.header,
                text:campaign.text,
                imageUrl:campaign.imageUrl,
                targetValue:campaign.targetValue,
                enabled:campaign.enabled
            };
            let userId = user.id;
            let depUrlEnd = 'api/user/'+userId+'/dependents';
            let dependents = await RequestService.getRequest(depUrlEnd);
            console.log('Dependents = ',dependents);
            
            this.setState({
                loading:false,
                sessionUser:user,
                selectedCampaign:selectedCampaign,
                dependents:dependents,
                dependent:campaign.dependent
            });
            return;
        }
        window.location.href='/signin';
    }

    inputChanged(evt)
    {
        const value = evt.target.value;
        const name = evt.target.name;
        let selectedCampaign = this.state.selectedCampaign;
        selectedCampaign[name] = value;
        this.setState({
            selectedCampaign:selectedCampaign
        });
    }

    booleanSelectChanged(evt)
    {
        const value = evt.target.value;
        const name = evt.target.name;
        let stateValue = true;
        if(value == 'false')
        {
            stateValue = false;
        }
        let selectedCampaign = this.state.selectedCampaign;
        selectedCampaign[name] = stateValue;
        this.setState({
            selectedCampaign:selectedCampaign
        });
    }

    findCampaign(campaign)
    {
        return campaign.id == this.props.match.params.campaignId;
    }

    async editCampaign(evt)
    {
        evt.preventDefault();
        console.log("Campaign",this.state.selectedCampaign);
        let campaignId = this.props.match.params.campaignId;
        let editUrl = 'api/campaign/'+campaignId;
        let editedCampaign = await RequestService.putRequest(editUrl,this.state.selectedCampaign);
        console.log(editedCampaign);
        let campaigns = this.state.sessionUser.campaigns;
        let campaignIndex = campaigns.findIndex(this.findCampaign);
        campaigns[campaignIndex] = editedCampaign;
        console.log("New Campaign Array",campaigns);
        let sessionUser = this.state.sessionUser;
        sessionUser.campaigns = campaigns;
        this.setState({
            sessionUser:sessionUser,
            showMessage:true,
            messageToShow:'Campaign Edited Successfully !!!!'
        });
        /*console.log("Campaign",this.state.selectedCampaign);
        console.log("Dependent ID",this.state.depId);
        let url = 'api/dependent/'+this.state.depId+'/campaign';
        let campaign = await RequestService.postRequest(url,this.state.selectedCampaign);
        console.log("Created Campaign",campaign);
        let user = this.state.sessionUser;
        user.campaigns.push(campaign);
        this.setState({
            selectedCampaign:{
                header:'',
                text:'',
                imageUrl:'',
                targetValue:0
            },
            sessionUser:user,
            depId:''
        });
        document.getElementById('create-campaign-form').reset();*/
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
                                <h3 className="campaign-create-title">Edit Campaign</h3>
                                <form onSubmit={this.editCampaign} id="edit-campaign-form">
                                    <div className="form-group row">
                                        <label className="col-lg-2 col-form-label dependent-label"><span>Dependent</span></label>
                                        <div className="col-lg-10">
                                            <DependentProfileItem dependent={this.state.dependent} />
                                        </div>
                                    </div>
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
                                    <BooleanSelectBoxControl
                                        label="Enabled ?"
                                        val={this.state.selectedCampaign.enabled}
                                        booleanSelectChanged={this.booleanSelectChanged}
                                    />
                                    <button type="submit" className="btn btn-primary">Save</button>
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

export default CampaignEdit;