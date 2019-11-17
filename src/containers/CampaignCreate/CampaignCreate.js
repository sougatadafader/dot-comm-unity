import React from 'react';
import Header from '../../components/Header';
import InputControl from '../../components/InputControl';
import UserService from '../../services/UserService';
import RequestService from '../../services/RequestService';

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
                imageUrl:''
            },
            depId:'',
            dependents:[]
        };
        this.createCampaign = this.createCampaign.bind(this);
        this.inputChanged = this.inputChanged.bind(this);
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
        const value = evt.target.value;
        const name = evt.target.name;
        let selectedCampaign = this.state.selectedCampaign;
        selectedCampaign[name] = value;
        this.setState({
            selectedCampaign:selectedCampaign
        });
    }

    createCampaign(evt)
    {
        evt.preventDefault();
        console.log(this.state.selectedCampaign);
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
                                <form onSubmit={this.createCampaign}>
                                    <InputControl
                                        label="Title"
                                        type="text"
                                        name="header"
                                        placeholder="Campaign Title"
                                        val={this.state.selectedCampaign.header}
                                        inputChanged={this.inputChanged}
                                    />
                                    <button type="submit" className="btn btn-primary">Create</button>
                                </form>
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