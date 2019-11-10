import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import Header from '../../components/Header';

class CampaignSingle extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {

        };
    }
    render()
    {
        return(
            <div className="bigbro-container">
                <Header />
                <div className="container">
                    <div className="col-12"><h3 className="text-center">Campaign Single</h3></div>
                </div>
            </div>
        );
    }
}

export default CampaignSingle;