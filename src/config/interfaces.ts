export interface ICommandLine {
  commands: any;
  msg: string;
}

export interface IDrawChartProps{  
  chartData: any
  status: string,
  loading: boolean,
  message: string,
  fetchChartDataAction: any
}

export interface ISimpleLineChartProps {
  chartData: any[];
  xColumns: string[];
  yColumns: string[];
}
