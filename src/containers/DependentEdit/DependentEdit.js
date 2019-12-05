import React from 'react';
import Header from '../../components/Header';
import UserService from '../../services/UserService';
import RequestService from '../../services/RequestService';
import DependentGridItem from '../../components/DependentGridItem';
import DependentCreate from '../DependentCreate/DependentCreate';
import InputControl from '../../components/InputControl';
import NoItem from '../../components/NoItem';
import CampaignGrid from '../../components/CampaignGrid';
import Message from '../../components/Message';
import Loading from '../../components/Loading';

class DependentEdit extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loading:true,
            dependents:[],
            selectedDependent:{
                firstName:'',
                lastName:'',
                imageUrl:'',
                landmark:'',
                zipcode:''
            },
            depId:'',
            sessionUser:{},
            showMessage:false,
            messageToShow:''
        }
        this.editThisDependent = this.editThisDependent.bind(this);
        this.inputChanged = this.inputChanged.bind(this);
    }


    componentDidMount()
    {

    }

    async loadData()
    {
        let user = await UserService.findUserInSession();
        if(Object.keys(user).length > 0)
        {
            let depId = this.props.match.params.depId;
            let depUrl = 'api/dependent/'+depId;
            let selectedDependent = await RequestService.getRequest(depUrl);
            let allDependentsUrl = 'api/user/'+user.id+'/dependents';
            let dependents = await RequestService.getRequest(allDependentsUrl);
            this.setState({
                loading:false,
                dependents:dependents,
                selectedDependent:{
                    firstName:selectedDependent.firstName,
                    lastName:selectedDependent.lastName,
                    imageUrl:selectedDependent.imageUrl,
                    landmark:selectedDependent.landmark,
                    zipcode:selectedDependent.zipcode
                },
                depId:depId,
                sessionUser:user
            });
            return;
        }
        window.location.href='/signin';
    }

    
    inputChanged(evt)
    {
        const value = evt.target.value;
        const name = evt.target.name;
        let selectedDependent = this.state.selectedDependent;
        selectedDependent[name] = value;
        this.setState({
            selectedDependent:selectedDependent
        });
    }

    findDependent(dependent)
    {
        return dependent.id == this.state.depId;
    }

    async editThisDependent(evt)
    {
        evt.preventDefault();
        let depEditUrl = 'api/dependent/'+this.state.depId;
        let editedDependent = await RequestService.putRequest(depEditUrl,this.state.selectedDependent);
        console.log('Edited Dependent = ',editedDependent);
        let dependents = this.state.dependents;
        let thisDependentIndex = dependents.findIndex(this.findDependent);
        dependents[thisDependentIndex] = editedDependent;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.setState({
            dependents:dependents,
            showMessage:true,
            messageToShow:'Dependent Edited Successfully'
        });
    }

    editDependent()
    {

    }

    showCampaigns()
    {
        if(this.state.sessionUser.campaigns.length > 0)
        {
            return(
                <CampaignGrid campaigns={this.state.sessionUser.campaigns} user={this.state.sessionUser} gridSize="12" showDisabled={true}/>
            );
        }
        return(
            <NoItem title="List Of Campaigns" text="No Campaigns Found" />
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
                                <h3 className="campaign-create-title">Update A Person In Need</h3>
                                <form onSubmit={this.editThisDependent} id="dependent-edit-form">
                                <InputControl 
                                        label="First Name"
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        val={this.state.selectedDependent.firstName}
                                        inputChanged={this.inputChanged}
                                    />
                                    
                                    <InputControl 
                                        label="Last Name"
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        val={this.state.selectedDependent.lastName}
                                        inputChanged={this.inputChanged}
                                    />
                                    <InputControl 
                                        label="Image URL"
                                        type="text"
                                        name="imageUrl"
                                        placeholder="Image URL"
                                        val={this.state.selectedDependent.imageUrl}
                                        inputChanged={this.inputChanged}
                                    />
                                    <InputControl 
                                        label="Landmark"
                                        type="text"
                                        name="landmark"
                                        placeholder="Landmark"
                                        val={this.state.selectedDependent.landmark}
                                        inputChanged={this.inputChanged}
                                    />
                                    <InputControl 
                                        label="ZipCode"
                                        type="text"
                                        name="zipcode"
                                        placeholder="ZipCode"
                                        val={this.state.selectedDependent.zipcode}
                                        inputChanged={this.inputChanged}
                                    />
                                    <button type="submit" className="btn btn-primary">Edit</button>
                                </form>
                            </div>
                            <div className="dependent-list card-ui">
                                <h3 className="dependent-list-title">List Of Dependent People</h3>
                                <div className="container-fluid">
                                    <div className="row">
                                        {
                                            this.state.dependents.length>0?
                                            this.state.dependents.map((dependent,index)=>
                                                (<DependentGridItem key={index} dependent={dependent} />)
                                            ):<h4>You don't have any dependents right now.</h4>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            {this.showCampaigns()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DependentEdit;

