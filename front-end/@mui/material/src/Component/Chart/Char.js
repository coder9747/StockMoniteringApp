
import React, { useEffect, useState,PureComponent } from 'react';
import { BarChart, XAxis, YAxis, Bar, CandlestickChart, ResponsiveContainer, Tooltip, CartesianGrid, LineChart, Line, Legend } from 'recharts/es6';




const formateTime = (time) => {
    const date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const relativeChange = (data) => {

}

const Char = () => {
    const [interval, setInterval] = useState(1);
    const [state, setState] = useState([]);
    useEffect(() => {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=${interval}min&apikey=demo`)
            .then((val) => val.json())
            .then((data) => {
                data = data[`Time Series (${interval}min)`];
                const arr = Object.keys(data).map(time => {
                    return {
                        date: formateTime(time),
                        close: parseFloat(data[time]['4. close']),
                        open: parseFloat(data[time]['1. open'])
                    }
                });
                setState(arr.reverse());
            });
    }, [])
    return (
        <ResponsiveContainer width="100%" aspect={3}>
            <LineChart data={state}>
                <CartesianGrid strokeDasharray={'5 5'} />
                <YAxis type='number' scale={'log'} domain={['auto', 'auto']} />
                <XAxis type='category' dataKey={'time'} />
                <Tooltip />
                <Legend />
                <Line type={'monotone'} stroke='red' dataKey='close' activeDot={{ r: 9 }} />
                <Line type='monotone' stroke='green' dataKey='open' activeDot={{ r: 9 }} />
            </LineChart>
        </ResponsiveContainer>
       


    )
}

export default Char
