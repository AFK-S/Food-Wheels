import React from 'react'
import ReactApexChart from 'react-apexcharts'

const SalesPerDayChart = () => {
    // Sample sales data for each day of the week
    const weeklySales = [160, 150, 200, 180, 220, 250, 210];

    const data = {
        series: [{
            name: 'Sales',
            data: weeklySales
        }],
        options: {
            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'category',
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] // Weekday labels
            },
            yaxis: {
                title: {
                    text: 'Sales'
                }
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy'
                },
            },
        },
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={data.options} series={data.series} type="area" height={350} />
            </div>
        </div>
    )
}

export default SalesPerDayChart
