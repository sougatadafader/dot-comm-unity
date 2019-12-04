import React from 'react';
import Header from '../../components/Header';
import UserService from '../../services/UserService';
import RequestService from '../../services/RequestService';
import DependentGridItem from '../../components/DependentGridItem';
import DependentCreate from '../DependentCreate/DependentCreate';
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
                id:'',
                firstName:'',
                lastName:'',
                imageUrl:'',
                landmark:'',
                zipcode:''
            }
        }
    }


    componentDidMount()
    {

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

    editThisDependent()
    {

    }

    editDependent()
    {

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
                                <h3 className="campaign-create-title">Update A Person In Need</h3>
                                <form onSubmit={this.editThisDependent.bind(this)} id="dependent-edit-form">
                                    <input type="hidden" name="id" defaultValue={this.state.selectedDependent.id} />
                                    <div className="form-group row">
                                        <label className="col-lg-2 col-form-label">First Name</label>
                                        <div className="col-lg-10">
                                            <input type="text" name="firstName" className="form-control" placeholder="First Name" defaultValue={this.state.selectedDependent.firstName} onChange={this.inputChanged.bind(this)} required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-2 col-form-label">Last Name</label>
                                        <div className="col-lg-10">
                                            <input type="text" name="lastName" className="form-control" placeholder="Last Name" defaultValue={this.state.selectedDependent.lastName} onChange={this.inputChanged.bind(this)} required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-2 col-form-label">Image URL</label>
                                        <div className="col-lg-10">
                                            <input type="text" name="imageUrl" className="form-control" placeholder="Image URL" defaultValue={this.state.selectedDependent.imageUrl} onChange={this.inputChanged.bind(this)} required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-2 col-form-label">Landmark</label>
                                        <div className="col-lg-10">
                                            <input type="text" name="landmark" className="form-control" placeholder="Landmark" defaultValue={this.state.selectedDependent.landmark} onChange={this.inputChanged.bind(this)} required />
                                        </div>                                        
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-2 col-form-label">Zipcode</label>
                                        <div className="col-lg-10">
                                            <input type="text" name="zipcode" className="form-control" placeholder="Zipcode" defaultValue={this.state.selectedDependent.zipcode} onChange={this.inputChanged.bind(this)} required />
                                        </div>
                                    </div>
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
                            <div className="card-ui"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DependentEdit;

