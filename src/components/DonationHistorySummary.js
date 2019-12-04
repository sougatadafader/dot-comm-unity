import React,{useState,useEffect} from 'react';

const DonationHistorySummary = ({nCampaigns,totalAmount}) => {
    const [campaigns,setCampaignCount] = useState(0);
    const [amount,setAmount] = useState(0);

    useEffect(() => {
        const cInterval = setTimeout(function campaignsUpdate() {
            setCampaignCount(campaigns => campaigns+1);
            console.log('Campaigns=',campaigns);
            console.log('N Campaigns=',nCampaigns);
            if(campaigns < nCampaigns)
            {
                setTimeout(campaignsUpdate,100);
            }
        },100);
        const aInterval = setInterval(() => {
            if(amount >= totalAmount)
            {
                clearInterval(aInterval);
                return;
            }
            setAmount(amount => amount+1);
        },100);
        return () => {clearTimeout(cInterval); clearInterval(aInterval);}
    },[]);

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