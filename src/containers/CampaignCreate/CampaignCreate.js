import React from 'react';
import Header from '../../components/Header';
import InputControl from '../../components/InputControl';
import DropDownControl from '../../components/DropDownControl';
import UserService from '../../services/UserService';
import RequestService from '../../services/RequestService';
import CampaignGridSingle from '../../components/CampaignGridSingle';

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
            dependents:[],
            dependentOptions:[],
            dependentOptionsLoading:true,
            sessionUser:null
        };
        this.createCampaign = this.createCampaign.bind(this);
        this.inputChanged = this.inputChanged.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.dropdownChanged = this.dropdownChanged.bind(this);
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
        document.getElementById('create-campaign-form').reset();
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
                            <div className="campaign-create-card card-ui">
                                <h3 className="campaign-create-title">Create A Campaign</h3>
                                <form onSubmit={this.createCampaign} id="create-campaign-form">
                                    <DropDownControl
                                        name="depId"
                                        title="Dependent"
                                        val=""
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
                            <div className="campaign-list-container">
                                <h3 className="campaign-list-title">List Of Campaigns</h3>
                                <div className="container-fluid">
                                    <div className="row">
                                        {
                                            this.state.sessionUser.campaigns.map((campaign,index) =>
                                                (<CampaignGridSingle key={index} campaign={campaign} />)
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CampaignCreate;