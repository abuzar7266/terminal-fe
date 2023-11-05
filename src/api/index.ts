import axios from 'axios';

class API {
    config = {
        headers: {

        }
    };

    failedNetwork = (error: any): Promise<any> => {
        return Promise.reject(error.response && error.response.data ? error.resopnse.data: {})
    };

    fetch = (route: string) => {
        return axios.get(route, this.config).catch(error=>{
            return this.failedNetwork(error);
        });
    };

    post = (route: string, data: any) => {
        return axios.post(route, data, this.config).catch(error=>{
            return this.failedNetwork(error);
        })
    };

    patch = (route: string, data: any) => {
        return axios.patch(route, data, this.config).catch(error=>{
            return this.failedNetwork(error);
        })
    };

    put = (route: string, data: any, config = undefined) => {
        return axios.put(route, data, config ?? this.config).catch(error=>{
            return this.failedNetwork(error);
        })
    };

    delete = (route: string) => {
        return axios.delete(route, this.config).catch(error=>{
            return this.failedNetwork(error);
        });
    };
}

export default new API();