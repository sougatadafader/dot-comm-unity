import React from 'react';
import Header from '../../components/Header';
import UserService from '../../services/UserService';
import RequestService from '../../services/RequestService';
class DependentCreate extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            sessionUser:{},
            loading:true
        }
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
            return;
        }
        window.location.href="/";
    }

    async createDependent(evt)
    {
        evt.preventDefault();
        let data = {
            firstName:document.querySelector('input[name="firstname"]').value,
            lastName:document.querySelector('input[name="lastname"]').value,
            imageUrl:document.querySelector('input[name="imageUrl"]').value,
            landmark:document.querySelector('input[name="landmark"]').value,
            zipcode:document.querySelector('input[name="zipcode"]').value
        };
        console.log('Data is',data);
        let urlEnd = 'api/dependent';
        let createdObj = await RequestService.postRequest(urlEnd,data);
        console.log(createdObj);
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
                        <div className="col-lg-12">
                            <div className="campaign-create-card card-ui">
                                <h3 className="campaign-create-title">Create A Person In Need</h3>
                                <form onSubmit={this.createDependent}>
                                    <div className="form-group row">
                                        <label className="col-lg-2 col-form-label">First Name</label>
                                        <div className="col-lg-10">
                                            <input type="text" name="firstname" className="form-control" placeholder="First Name" required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-2 col-form-label">Last Name</label>
                                        <div className="col-lg-10">
                                            <input type="text" name="lastname" className="form-control" placeholder="Last Name" required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-2 col-form-label">Image URL</label>
                                        <div className="col-lg-10">
                                            <input type="text" name="imageUrl" className="form-control" placeholder="Image URL" required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-2 col-form-label">Landmark</label>
                                        <div className="col-lg-10">
                                            <input type="text" name="landmark" className="form-control" placeholder="Landmark" required />
                                        </div>                                        
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-2 col-form-label">Zipcode</label>
                                        <div className="col-lg-10">
                                            <input type="text" name="zipcode" className="form-control" placeholder="Zipcode" required />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DependentCreate;