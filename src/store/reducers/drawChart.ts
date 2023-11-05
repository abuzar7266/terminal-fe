import { STATUS } from '@/config/constants';
import { FETCH_CHART_DATA } from '@/store/types';

const initialState = {
    chartData: [],
    loading: true,
    status: "",
    message: ""
}

export const drawChartReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_CHART_DATA.FULLFILLED:
        return {
          ...state,
          chartData: action?.payload?.chartData?.data?.error ? [] : action?.payload?.chartData?.data,
          loading: false,
          status: action?.payload?.chartData?.data?.error ? STATUS.ERROR: STATUS.SUCCESS,
          message: action?.payload?.chartData?.data.error ? action?.payload?.chartData?.data?.error : ""
        };
      case FETCH_CHART_DATA.REJECTED:
        return {
            ...state,
            loading: false,
            status: STATUS.ERROR,
            message: "Error occurred in fetching chart data from server"
        }
      case FETCH_CHART_DATA.STARTED:
        return {
            ...state,
            chartData: [],
            loading: true,
            status: "",
            message: ""
        }
      default:
        return state;
    }
  };
  