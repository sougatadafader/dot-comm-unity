import React,{useState,useEffect} from 'react';

const DonationHistorySummary = ({nCampaigns,totalAmount}) => {
    let [campaigns,setCampaignCount] = useState(0);
    let [amount,setAmount] = useState(0);

    useEffect(() => {
        const cInterval = setTimeout(() => {
            setCampaignCount(campaigns => campaigns < nCampaigns?campaigns+1:campaigns);
        },100);
        const aInterval = setInterval(() => {
            setAmount(amount => amount < totalAmount?amount+1:amount);
        },100);
        return () => {clearInterval(cInterval); clearInterval(aInterval);}
    },[campaigns,amount]);

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