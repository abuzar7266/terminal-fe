import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_CHART_DATA } from '@/store/types';
import { fetchChartDataAction } from "../actions/drawChart";
import ChartDataApi from '@/api/chartData';

function* fetchChartData(action: any) : Generator<any, void, void> {
   try{
    const chartData = yield call(ChartDataApi.fetchChartData, action.payload);
    yield put(fetchChartDataAction.FULLFILLED(chartData))
   }catch(error){
    yield put(fetchChartDataAction.REJECTED({}))
   }
}

export function* watcherChartData() {
    yield takeLatest(FETCH_CHART_DATA.STARTED, fetchChartData);
}