import React from 'react';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import DonationHistorySummary from '../../components/DonationHistorySummary';
import UserDonations from '../../components/UserDonations';

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
            let campaignsUrl = 'api/campaigns';
            let campaigns = await RequestService.getRequest(campaignsUrl);
            for(let i=0;i<donations.length;i++)
            {
                let campaignNumber = donations[i].campaignNumber;
                let campaign = campaigns.filter(function(campaign){
                    return campaign.id == campaignNumber;
                });
                donations[i]['campaign'] = campaign[0];
            }
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

    calcCampaignsTimer()
    {
        let totalDonations = this.state.donations.length;
        let timer = parseInt(3000/totalDonations);
        return timer;
    }

    calcTotalDonationTimer()
    {
        let totalDonationAmt = this.calcTotalDonation();
        let timer = (3000/totalDonationAmt).toFixed(2);
        return timer;
    }
    calcAmountSteps()
    {
        let totalDonationAmt = this.calcTotalDonation();
        let amountSteps = parseInt(totalDonationAmt/10);
        if(totalDonationAmt < 10)
        {
            amountSteps = totalDonationAmt;
        }
        return amountSteps;
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
                            <DonationHistorySummary nCampaigns={this.state.donations.length} totalAmount={this.calcTotalDonation()} amountSteps={this.calcAmountSteps()} />
                            <UserDonations donations={this.state.donations} />
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