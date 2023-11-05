import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { STATUS } from "@/config/constants";
import { IDrawChartProps } from "@/config/interfaces";
import SimpleLineChart from "./SimpleLineChart";

const DrawChart:React.FC<IDrawChartProps> = ({chartData, status, loading, message, fetchChartDataAction}) =>{
    const [chartState, setChartState] = useState({
        chartData: [],
        status: "",
        loading: true,
        message: ""
    })

    const router = useRouter();
    const { filename, columns } = router.query;

    useEffect(()=>{
      if(filename && columns){
        fetchChartDataAction({
          filename,
          columns
        });
      }
    },[filename, columns])

    useEffect(()=>{
        setChartState({chartData: chartData?.sort((a: any, b: any) => {
            const dateA = a ? new Date(a.Date) : null;
            const dateB = b ? new Date(b.Date) : null;
          
            if (dateA && dateB) {
              return dateA.getTime() - dateB.getTime();
            } else {
              return 0;
            }
          }), status, loading, message});
    },[chartData, status, loading, message])

    return <>
        {
            chartState?.loading ? (
                <p style={{fontFamily: "Shift, sans-serif", fontSize:'larger', textAlign:'center', color:'red', background:'rgba(0, 0, 0, 0.09)', padding:'20% 30% 20% 30%'}}>Loading...</p>
            ): (<>
                {
                    status === STATUS.ERROR ? (
                        <p style={{fontFamily: "Shift, sans-serif", fontSize:'larger', textAlign:'center', color:'red', background:'rgba(0, 0, 0, 0.09)', padding:'20% 30% 20% 30%'}}>{message}</p>
                    ):(<div style={{marginTop:'10%', marginLeft:'20%'}}>
                            <SimpleLineChart chartData={chartState.chartData ?? []} xColumns={['Date']} yColumns={Object.keys(chartState.chartData[0]).filter(column => column != 'Date') ?? []}/>
                    </div>)
                }   
            </>)
        }
    </>
}
export default DrawChart;