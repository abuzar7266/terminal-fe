import { combineReducers } from 'redux';
import { drawChartReducer } from './drawChart';

const rootReducer = combineReducers({
  drawChart: drawChartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;