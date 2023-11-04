import { all } from 'redux-saga/effects';
import { watcherChartData } from './drawChart';

export default function* rootSaga() {
    const sagas: any = [
        watcherChartData()
    ];
    yield all(sagas);
}