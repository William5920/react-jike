import {useEffect, useRef} from 'react'
import * as eachrts from 'echarts'

const BarChart = ({xData, sData, style={width: '400px', height: '300px'}}) => {
  const chartRef = useRef(null)
  useEffect(() => {
    // 1.生成实例
    const myChart = eachrts.init(chartRef.current)
    // 2.准备图表参数
    const option = {
      xAxis: {
        type: 'category',
        data: xData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: sData,
          type: 'bar'
        }
      ]
    }
    // 3.渲染参数
    myChart.setOption(option)
  }, [xData, sData])

  return (
    <div ref={chartRef} style={style}></div>
  )
}

export default BarChart