var baseUrl = "//bigbro-server.herokuapp.com/";

export default class RequestService
{
    async static getRequest(urlEnd)
    {

    }

    async static postRequest(urlEnd,data)
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
}