import { RootState } from '@/store/reducers';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import DrawChart from '@/components/DrawChart';
import { fetchChartDataAction } from '@/store/actions/drawChart';

const drawChartProps = (state: RootState) => {
    let {chartData, loading, status, message} = state?.drawChart;
    return {
        chartData,
        loading,
        status,
        message
    }
}

const drawChartDispatch = (dispatch: Dispatch) =>{
    return bindActionCreators(
        {
            fetchChartDataAction: fetchChartDataAction.STARTED
        },
        dispatch
    )
}

export const DrawChartContainer = connect(drawChartProps, drawChartDispatch)(DrawChart);

