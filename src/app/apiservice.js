import axios from 'axios';

const httplient = axios.create({
    baseURL:'http://localhost:8080';
});


class ApiService {
    constructor(apiurl){
        this.apiurl = apiurl;
    }

    post(url, objeto){
        return httpClient.post(url, objeto);
    }

    put(url, objeto){
        return httplient.put(url, objeto);
    }

    delete(url){
        return httplient.delete();
    }

    get(url){
        return httplient.put();
    }
}

export default ApiService;