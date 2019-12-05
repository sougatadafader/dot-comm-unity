var baseUrl = "//bigbro-server.herokuapp.com/";

export default class RequestService
{
    static async getRequest(urlEnd)
    {
        const url = baseUrl+urlEnd;
        let resp = await fetch(url,{
            credentials:'include'
        });
        let json = [];
        if(resp != null)
        {
            json = await resp.json();
        }
        return json;
    }
    
    static async postRequest(urlEnd,data)
    {
        const url = baseUrl+urlEnd;
        let resp = await fetch(url,{
            method:'POST',
            credentials:'include',
            body:JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        let json = await resp.json();
        return json;
    }

    static async putRequest(urlEnd,data)
    {
        const url = baseUrl+urlEnd;
        let resp = await fetch(url,{
            method:'PUT',
            credentials:'include',
            body:JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        let json = await resp.json();
        return json;
    }
    static calculateDonation(campaign)
    {
        let donations = campaign.donations;
        let totalDonation = 0;
        for(let i=0;i<donations.length;i++)
        {
            let value = donations[i].value;
            totalDonation += value;
        }
        let targetValue = parseInt(campaign.targetValue);
        let percent = 100;
        if(totalDonation < targetValue)
        {
            percent = (totalDonation/targetValue).toFixed(2);
            percent = percent*100;
        }
        let percentText = percent+'%';
        let obj = {
            totalDonation:totalDonation,
            percent:percent,
            percentText:percentText
        };
        return obj;
    }
    static calculateDate(created)
    {
        let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        let createdArr = created.split('T');
        let createdDate = createdArr[0];
        let createdDateArr = createdDate.split('-');
        let dateShow = createdDateArr[2]+' '+months[createdDateArr[1]-1]+' '+createdDateArr[0];
        return dateShow;
    }
} 