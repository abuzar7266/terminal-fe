import { getRoutes } from '@/api/apiRoutes';
import api from '@/api';

class CHART_DATA_API {
    fetchChartData = (payload: any): Promise<any> =>{
        return api.fetch(getRoutes('fetchChartData', payload));
    }

    deleteChartData = (filename: string): Promise<any> =>{
        return api.delete(getRoutes('deleteChartData', {filename}));
    }
}

export default new CHART_DATA_API();