import React,{useState,useEffect} from 'react';

const DonationHistorySummary = ({nCampaigns,totalAmount,amountSteps}) => {
    let [campaigns,setCampaignCount] = useState(0);
    let [amount,setAmount] = useState(0);
    let [isFinished,setIsFinished] = useState(false);

    useEffect(() => {
        const cInterval = setTimeout(function updateCampaign() {
            setCampaignCount(campaigns => campaigns < nCampaigns?campaigns+1:campaigns);
            setIsFinished(isFinished => campaigns < nCampaigns || amount < totalAmount?false:true);
            setTimeout(updateCampaign,100);
        },100);
        const aInterval = setTimeout(function updateAmount() {
            setAmount(amount => (amount+amountSteps) < totalAmount?(amount+amountSteps):amount);
            setIsFinished(isFinished => (campaigns < nCampaigns || amount < totalAmount)?false:true);
            setTimeout(updateAmount,1);
        },100);
        return () => {clearTimeout(cInterval); clearTimeout(aInterval);}
    },[isFinished]);

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6">
                    <p>Donated To</p>
                    <p>{campaigns} Campaigns</p>
                </div>
                <div className="col-lg-6">
                    <p>Total Donation Amount</p>
                    <p>${amount}</p>
                </div>
            </div>
        </div>
    );
};

export default DonationHistorySummary;