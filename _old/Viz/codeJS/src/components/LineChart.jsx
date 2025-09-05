// https://blog.logrocket.com/using-chart-js-react/

import React from "react";
import { Line } from "react-chartjs-2";
function LineChart({ chartData, chartTitle, chartHeader}) {
    return (
            <div className="chart-container">
                <h2 style={{ textAlign: "center" }}>{chartHeader}</h2>
                <Line
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: chartTitle
                            },
                            legend: {
                                display: false
                            }
                        }
                    }}
                />
            </div>
    );
}
export default LineChart;