var baseUrl = "//bigbro-server.herokuapp.com/";

export default class RequestService
{
    static async getRequest(urlEnd)
    {
        const url = baseUrl+urlEnd;
        let resp = await fetch(url,{
            credentials:'include'
        });
        let json = await resp.json();
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
}