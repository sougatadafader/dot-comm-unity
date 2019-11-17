import React from 'react';
import Header from '../../components/Header';
import UserService from '../../services/UserService';
import RequestService from '../../services/RequestService';
import DependentGridItem from '../../components/DependentGridItem';
import InputControl from '../../components/InputControl';
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
            }
        }

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
        this.setState({
            dependents:dependents,
            selectedDependent:{
                firstName:'',
                lastName:'',
                imageUrl:'',
                landmark:'',
                zipcode:''
            }
        });
        console.log(createdObj);
        document.getElementById('dependent-create-form').reset();
    }


    render()
    {
        if(this.state.loading)
        {
            return(
                <div></div>
            );
        }
        return(
            <div className="bigbro-container">
                <Header />
                <div className="container space--top">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="campaign-create-card card-ui">
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
                                            this.state.dependents.map((dependent,index)=>
                                                (<DependentGridItem key={index} dependent={dependent} />)
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card-ui"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DependentCreate;