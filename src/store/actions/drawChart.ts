import { FETCH_CHART_DATA } from "@/store/types"

export const fetchChartDataAction = {
    STARTED: (payload: any) =>{
        return { 
        type: FETCH_CHART_DATA.STARTED,
        payload
    }},
    FULLFILLED: (chartData: any) =>({ 
        type: FETCH_CHART_DATA.FULLFILLED,
        payload: {
            chartData
        }
    }),
    REJECTED: (payload: any) =>({ 
        type: FETCH_CHART_DATA.REJECTED,
        payload
    })
}