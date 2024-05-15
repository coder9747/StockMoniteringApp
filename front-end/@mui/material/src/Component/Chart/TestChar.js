import React, { useEffect, useState } from "react";
import CanvasJSReact from '@canvasjs/react-stockcharts';
import { Button, ButtonGroup, Typography } from '@mui/material';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const App = () => {
    const [dataPoints1, setDataPoints1] = useState([]);
    const [dataPoints2, setDataPoints2] = useState([]);
    const [dataPoints3, setDataPoints3] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [timeInterval, setTimeInterval] = useState(1);
    const [time, setTime] = useState({});
    const [metaData, setMetadata] = useState(null);

    useEffect(() => {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=${timeInterval}min&apikey=demo`)
            .then(val => val.json())
            .then((data) => {
                setMetadata(data['Meta Data']);
                data = data[`Time Series (${timeInterval}min)`];
                const dsp1 = [];
                const dsp2 = [];
                const dsp3 = [];
                let arr = Object.keys(data);
                arr = arr.reverse()
                setTime({ min: arr[arr.length - 1], max: arr[0] });
                arr.forEach((time) => {
                    dsp1.push({
                        x: new Date(time),
                        y: [
                            Number(data[time]['1. open']),
                            Number(data[time]['2. high']),
                            Number(data[time]['3. low']),
                            Number(data[time]['4. close'])
                        ]
                    })
                    dsp1.push({
                        x: new Date(time),
                        y: Number(data[time]['5. volume']),
                    })
                    dsp3.push({
                        x: new Date(time),
                        y: Number(data[time]['4. close']),
                    })
                });
                setDataPoints1(dsp1);
                setDataPoints2(dsp2);
                setDataPoints3(dsp3);
                setIsLoaded(true);
            })
    }, [timeInterval]);

    const handleButtonClick = (range) => {
        // Implement your logic for handling button clicks here
        console.log(`Selected range: ${range}`);
    };


    const options = {
        theme: "light2",
        title: {
            text: "React StockChart with Date-Time Axis"
        },
        subtitles: [{
            text: "Price-Volume Trend"
        }],
        charts: [{
            axisX: {
                lineThickness: 5,
                tickLength: 0,
                labelFormatter: function (e) {
                    return "";
                },
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    labelFormatter: function (e) {
                        return "";
                    }
                }
            },
            axisY: {
                title: "Litecoin Price",
                prefix: "₹",
                tickLength: 0
            },
            toolTip: {
                shared: true
            },
            data: [{
                fallingColor: "red",
                risingColor: "green",

                name: "Price (in ₹)",
                yValueFormatString: "$#,###.##",
                type: "candlestick",
                dataPoints: dataPoints1
            }]
        }, {
            height: 100,
            axisX: {
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            axisY: {
                title: "Volume",
                prefix: "₹",
                tickLength: 0
            },
            toolTip: {
                shared: true
            },
            data: [{
                fallingColor: "#AF2020",

                name: "Volume",
                yValueFormatString: "$#,###.##",
                type: "column",
                dataPoints: dataPoints2
            }]
        }],
        navigator: {
            data: [{
                fallingColor: "#AF2020",
                dataPoints: dataPoints3
            }],
            slider: {
                minimum: time.min,
                maximum: time.max
            }
        },
        rangeSelector: {
            enabled: false,
        },

    };

    const containerProps = {
        width: "100%",
        height: "500px",
        margin: "auto"
    };

    return (
        <div>
            <div>
                {isLoaded && (
                    <CanvasJSStockChart containerProps={containerProps} options={options} />
                )}
            </div>
            <div>
                <div className="mx-12">
                    <Typography variant="p" gutterBottom >
                        Select Range
                    </Typography>
                    <ButtonGroup color="primary" aria-label="time-range-buttons">
                        <Button onClick={() => handleButtonClick('1m')}>1m</Button>
                        <Button onClick={() => handleButtonClick('5m')}>5m</Button>
                        <Button onClick={() => handleButtonClick('30m')}>30m</Button>
                        <Button onClick={() => handleButtonClick('60m')}>60m</Button>
                    </ButtonGroup>
                </div>
                {/* Add other components as needed */}
            </div>
        </div>
    );
};

export default App;
