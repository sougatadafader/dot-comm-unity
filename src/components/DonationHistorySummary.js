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
        },300);
        const aInterval = setTimeout(function updateAmount() {
            setAmount(amount => (amount+amountSteps) < totalAmount?(amount+amountSteps):totalAmount);
            setIsFinished(isFinished => (campaigns < nCampaigns || amount < totalAmount)?false:true);
            setTimeout(updateAmount,1);
        },600);
        return () => {clearTimeout(cInterval); clearTimeout(aInterval);}
    },[isFinished]);

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6 donation-history-summary-single">
                    <div className="media donation-history-summary-media">
                        <img className="img-responsive donation-history-icon" src="https://i.imgur.com/T6OG9vf.png"></img>
                        <div className="media-body">
                            <h3 className="donation-counter text-center">{campaigns}</h3>
                            <p className="text-center">NUMBER OF DONATIONS</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 donation-history-summary-single">
                <div className="media donation-history-summary-media">
                        <img className="img-responsive donation-history-icon" src="https://i.imgur.com/0Smdpow.png"></img>
                        <div className="media-body">
                            <h3 className="donation-counter text-center">{amount}</h3>
                            <p className="text-center">TOTAL AMOUNT DONATED</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationHistorySummary;