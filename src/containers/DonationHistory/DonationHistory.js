import React from 'react';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import DonationHistorySummary from '../../components/DonationHistorySummary';

import UserService from '../../services/UserService';
import RequestService from '../../services/RequestService';

class DonationHistory extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loading:true,
            sessionUser:{},
            donations:[]
        };
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
            let userId = user.id;
            let donationUrl = 'api/user/'+userId+'/donations';
            let donations = await RequestService.getRequest(donationUrl);
            this.setState({
                loading:false,
                sessionUser:user,
                donations:donations
            });
            return;
        }
        window.location.href = '/';
    }

    calcTotalDonation()
    {
        let donations = this.state.donations;
        let sum = 0;
        for(var i=0;i<donations.length;i++)
        {
            sum+=donations[i].value;
        }
        return sum;
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
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="donation-history-card card-ui">
                                <h3 className="donation-history-title">Donation History</h3>
                                <DonationHistorySummary nCampaigns={this.state.donations.length} totalAmount={this.calcTotalDonation()} />
                            </div>
                        </div>
                        <div className="col-lg-4">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DonationHistory;