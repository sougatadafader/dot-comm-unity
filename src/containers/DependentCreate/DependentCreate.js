import React from 'react';
import Header from '../../components/Header';
import UserService from '../../services/UserService';
import RequestService from '../../services/RequestService';
import DependentGridItem from '../../components/DependentGridItem';
import InputControl from '../../components/InputControl';
import CampaignGrid from '../../components/CampaignGrid';
import NoItem from '../../components/NoItem';
import Loading from '../../components/Loading';
import Message from '../../components/Message';
class DependentCreate extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            sessionUser:{},
            loading:true,
            dependents:[],
            isEdit:false,
            selectedDependent:{
                firstName:'',
                lastName:'',
                imageUrl:'',
                landmark:'',
                zipcode:''
            },
            showMessage:false,
            messageToShow:''
        }

        this.inputChanged = this.inputChanged.bind(this);
        this.closeMessage = this.closeMessage.bind(this);
    }


    componentDidMount()
    {
        this.loginCheck();
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
            this.setState({
                dependents:dependents
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
        let selectedDependent = this.state.selectedDependent;
        selectedDependent[name] = value;
        this.setState({
            selectedDependent:selectedDependent
        });
    }

    async createDependent(evt)
    {
        evt.preventDefault();
        /*let data = {
            firstName:document.querySelector('input[name="firstName"]').value,
            lastName:document.querySelector('input[name="lastName"]').value,
            imageUrl:document.querySelector('input[name="imageUrl"]').value,
            landmark:document.querySelector('input[name="landmark"]').value,
            zipcode:document.querySelector('input[name="zipcode"]').value
        };*/

        console.log("State Data = ",this.state.selectedDependent);

        
        let urlEnd = 'api/dependent';
        let createdObj = await RequestService.postRequest(urlEnd,this.state.selectedDependent);
        let dependents = this.state.dependents;
        dependents.push(createdObj);
        
        console.log(createdObj);
        document.getElementById('dependent-create-form').reset();
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.setState({
            dependents:dependents,
            selectedDependent:{
                firstName:'',
                lastName:'',
                imageUrl:'',
                landmark:'',
                zipcode:''
            },
            showMessage:true,
            messageToShow:'You have successfully created a dependent'
        });
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
                            <div className="dependent-create-card card-ui">
                                <h3 className="campaign-create-title">Create A Person In Need</h3>
                                <form onSubmit={this.createDependent.bind(this)} id="dependent-create-form">

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
                                    <button type="submit" className="btn btn-primary">Create</button>
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

export default DependentCreate;