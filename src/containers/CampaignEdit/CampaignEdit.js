import React from 'react';
import Loading from '../../components/Loading';
import InputControl from '../../components/InputControl';
import DropDownControl from '../../components/DropDownControl';
import CampaignGrid from '../../components/CampaignGrid';
import NoItem from '../../components/NoItem';
import DependentProfileList from '../../components/DependentProfileList';
import UserService from '../../services/UserService';
import RequestService from '../../services/RequestService';

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
                targetValue:0
            },
            depId:'',
            dependents:[],
            dependentOptions:[],
            dependentOptionsLoading:true
        };
        this.editCampaign = this.editCampaign.bind(this);
        this.inputChanged = this.inputChanged.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.dropdownChanged = this.dropdownChanged.bind(this);
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
                targetValue:campaign.targetValue
            };
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
                loading:false,
                sessionUser:user,
                selectedCampaign:selectedCampaign,
                dependents:dependents,
                dependentOptions:dependentOptions,
                dependentOptionsLoading:false
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

    dropdownChanged(evt)
    {
        const value = evt.target.value;
        const name = evt.target.name;
        this.setState({
            [name]:value
        });
    }

    async editCampaign(evt)
    {
        evt.preventDefault();
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
            return(
                <CampaignGrid campaigns={this.state.sessionUser.campaigns} user={this.state.sessionUser} />
            );
        }
        return(
            <NoItem title="List of Campaigns" text="No Campaigns To Show. Create one now" />
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
                            <div className="campaign-create-card card-ui">
                                <h3 className="campaign-create-title">Create A Campaign</h3>
                                <form onSubmit={this.editCampaign} id="create-campaign-form">
                                    <DropDownControl
                                        name="depId"
                                        title="Dependent"
                                        val={this.state.depId}
                                        values={this.state.dependentOptions}
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

export default CampaignEdit;