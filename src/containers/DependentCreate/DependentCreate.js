import React from 'react';

class DependentCreate extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div className="bigbro-container">
                <div className="container space--top">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="campaign-create-card card-ui">
                                <h3 className="campaign-create-title">Create A Person In Need</h3>
                                <form>
                                    <div className="form-group">
                                        <label className="col-lg-2 col-form-label">First Name</label>
                                        <input type="text" name="firstname" className="form-control" placeholder="First Name" />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-2 col-form-label">Last Name</label>
                                        <input type="text" name="lastname" className="form-control" placeholder="Last Name" />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-2 col-form-label">Landmark</label>
                                        <input type="text" name="landmark" className="form-control" placeholder="Landmark" />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-2 col-form-label">Zipcode</label>
                                        <input type="text" name="zipcode" className="form-control" placeholder="Zipcode" />
                                    </div>
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

export default DependentCreate;